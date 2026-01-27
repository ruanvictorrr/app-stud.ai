import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  GoogleGenAI,
  createPartFromUri,
  createUserContent,
} from "@google/genai";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import crypto from "crypto";
import os from "os";
import path from "path";
import { writeFile, unlink } from "fs/promises";
import * as pdfParse from "pdf-parse";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Provider = "openai" | "gemini";
type SummaryStyle = "bullet" | "explained";
type CardDifficulty = "easy" | "medium" | "hard";

const FREE_MONTHLY_LIMIT = Number(process.env.FREE_MONTHLY_LIMIT || "10");

// ---------- helpers ----------
function hasValue(v?: string) {
  return typeof v === "string" && v.trim().length > 0;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function monthKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function isProActive(user: any) {
  if (user?.role === "ADMIN") return true;
  if (user?.plan === "PRO") {
    if (!user?.proUntil) return true;
    return new Date(user.proUntil).getTime() > Date.now();
  }
  return false;
}

function getGeminiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
}

function safeParseJson(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getStudySchema() {
  return {
    type: "object",
    additionalProperties: false,
    required: ["topic", "flashcards", "summary"],
    properties: {
      topic: { type: "string" },
      flashcards: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "question", "answer"],
          properties: {
            id: { type: "integer" },
            question: { type: "string" },
            answer: { type: "string" },
          },
        },
      },
      summary: {
        type: "object",
        additionalProperties: false,
        required: ["title", "style", "difficulty", "mainTopics", "keyPoints"],
        properties: {
          title: { type: "string" },
          style: { type: "string" },
          difficulty: { type: "string" },
          mainTopics: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["id", "title", "content", "icon"],
              properties: {
                id: { type: "integer" },
                title: { type: "string" },
                content: { type: "string" },
                icon: { type: "string" },
              },
            },
          },
          keyPoints: { type: "array", items: { type: "string" } },
        },
      },
    },
  };
}

function buildPromptFromText(params: {
  text: string;
  flashcardsCount: number;
  summaryStyle: SummaryStyle;
  difficulty: CardDifficulty;
}) {
  const styleText =
    params.summaryStyle === "bullet"
      ? "Resuma em formato de tópicos (bullet points), direto e objetivo."
      : "Resuma explicado, em texto corrido e bem didático, com exemplos quando fizer sentido.";

  const diffText =
    params.difficulty === "easy"
      ? "Flashcards fáceis (definições e perguntas diretas)."
      : params.difficulty === "hard"
      ? "Flashcards difíceis (perguntas que exigem raciocínio, aplicação e comparação)."
      : "Flashcards de dificuldade média (conceitos + aplicação simples).";

  const baseJson = `Retorne APENAS um JSON válido com esta estrutura:
{
  "topic": "Tópico principal do material",
  "flashcards": [
    { "id": 1, "question": "Pergunta clara e objetiva", "answer": "Resposta completa e educativa" }
  ],
  "summary": {
    "title": "Título do resumo",
    "style": "${params.summaryStyle}",
    "difficulty": "${params.difficulty}",
    "mainTopics": [
      { "id": 1, "title": "Título do tópico", "content": "Conteúdo detalhado do tópico", "icon": "emoji apropriado" }
    ],
    "keyPoints": ["ponto-chave 1", "ponto-chave 2"]
  }
}`;

  const rules = `Regras:
- Crie exatamente ${params.flashcardsCount} flashcards.
- ${diffText}
- ${styleText}
- Crie 3 a 5 tópicos principais em summary.mainTopics.
- Seja educativo e completo.
- Não inclua texto fora do JSON.`;

  const snippet = params.text.slice(0, 12000);

  return `Analise este conteúdo de estudo e crie material educacional:

${snippet}

${baseJson}

${rules}`;
}

function buildPromptForPdfOcr(params: {
  flashcardsCount: number;
  summaryStyle: SummaryStyle;
  difficulty: CardDifficulty;
}) {
  // Importante: aqui o conteúdo vem do ARQUIVO PDF anexado (via URI).
  // Então o prompt não precisa colar o texto; precisa instruir a extrair/OCR.
  const styleText =
    params.summaryStyle === "bullet"
      ? "Resuma em formato de tópicos (bullet points), direto e objetivo."
      : "Resuma explicado, em texto corrido e bem didático, com exemplos quando fizer sentido.";

  const diffText =
    params.difficulty === "easy"
      ? "Flashcards fáceis (definições e perguntas diretas)."
      : params.difficulty === "hard"
      ? "Flashcards difíceis (perguntas que exigem raciocínio, aplicação e comparação)."
      : "Flashcards de dificuldade média (conceitos + aplicação simples).";

  const baseJson = `Retorne APENAS um JSON válido com esta estrutura:
{
  "topic": "Tópico principal do material",
  "flashcards": [
    { "id": 1, "question": "Pergunta clara e objetiva", "answer": "Resposta completa e educativa" }
  ],
  "summary": {
    "title": "Título do resumo",
    "style": "${params.summaryStyle}",
    "difficulty": "${params.difficulty}",
    "mainTopics": [
      { "id": 1, "title": "Título do tópico", "content": "Conteúdo detalhado do tópico", "icon": "emoji apropriado" }
    ],
    "keyPoints": ["ponto-chave 1", "ponto-chave 2"]
  }
}`;

  const rules = `Regras:
- O conteúdo está em um ARQUIVO PDF anexado. Extraia o texto do PDF.
- Se o PDF for escaneado/imagem, faça OCR e recupere o máximo de texto possível.
- Crie exatamente ${params.flashcardsCount} flashcards.
- ${diffText}
- ${styleText}
- Crie 3 a 5 tópicos principais em summary.mainTopics.
- Seja educativo e completo.
- Não inclua texto fora do JSON.`;

  return `Você é um assistente educacional. Use o PDF anexado como fonte.

${baseJson}

${rules}`;
}

// ---------- PDF text extraction ----------
async function extractPdfText(buffer: Buffer) {
  try {
    const data = await (pdfParse as any)(buffer);
    const text = (data?.text || "").replace(/\s+\n/g, "\n").trim();
    return text;
  } catch {
    return "";
  }
}

function looksLikeHasRealText(text: string) {
  // heurística simples: texto suficiente e com “densidade” mínima
  const t = (text || "").trim();
  if (t.length < 300) return false;
  // se quase tudo for caracteres estranhos, também não
  const weird = t.match(/[^\p{L}\p{N}\p{P}\p{Z}\n\r]/gu)?.length ?? 0;
  const ratio = weird / Math.max(1, t.length);
  return ratio < 0.05;
}

// ---------- quota control ----------
async function enforceAndIncrementUsage(userId: string) {
  const now = new Date();
  const mk = monthKey(now);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    throw Object.assign(new Error("Usuário não encontrado."), { status: 401 });

  if (isProActive(user)) {
    return { ok: true, user, limited: false, remaining: null };
  }

  const last = user.monthlyResetAt ? monthKey(user.monthlyResetAt) : null;
  if (last !== mk) {
    await prisma.user.update({
      where: { id: userId },
      data: { monthlyUsed: 0, monthlyResetAt: now },
    });
    (user as any).monthlyUsed = 0;
    (user as any).monthlyResetAt = now;
  }

  if ((user.monthlyUsed ?? 0) >= FREE_MONTHLY_LIMIT) {
    return { ok: false, user, limited: true, remaining: 0 };
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { monthlyUsed: { increment: 1 } },
  });

  const remaining = Math.max(0, FREE_MONTHLY_LIMIT - (updated.monthlyUsed ?? 0));
  return { ok: true, user: updated, limited: true, remaining };
}

// ---------- providers ----------
async function runWithOpenAI(params: { content: any[]; model: string }) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: params.model,
    messages: [
      {
        role: "system",
        content:
          "Você é um assistente educacional especializado em criar materiais de estudo. Responda sempre com JSON válido e nada além disso.",
      },
      { role: "user", content: params.content },
    ],
    response_format: { type: "json_object" },
    max_tokens: 2000,
  });

  const raw = completion.choices[0]?.message?.content || "";
  const parsed = safeParseJson(raw);
  if (!parsed) throw new Error("OpenAI retornou JSON inválido.");
  return parsed;
}

async function runWithGeminiText(params: { prompt: string; model: string; retries?: number }) {
  const ai = new GoogleGenAI({ apiKey: getGeminiKey() });
  const retries = params.retries ?? 2;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: params.model,
        contents: params.prompt,
        config: {
          systemInstruction:
            "Você é um assistente educacional especializado em criar materiais de estudo. Responda apenas em JSON seguindo o schema.",
          responseMimeType: "application/json",
          responseJsonSchema: getStudySchema(),
        },
      });

      const raw = response.text || "";
      const parsed = safeParseJson(raw);
      if (!parsed) throw new Error("Gemini retornou JSON inválido.");
      return parsed;
    } catch (err: any) {
      const status = err?.status || err?.code;
      const msg = (err?.message || "").toString();
      const overloaded =
        status === 503 || msg.includes("overloaded") || msg.includes("UNAVAILABLE");

      if (attempt < retries && overloaded) {
        await sleep(1000 * (attempt + 1) * (attempt + 1));
        continue;
      }
      throw err;
    }
  }

  throw new Error("Falha ao gerar com Gemini.");
}

async function uploadBufferToTmpFile(buffer: Buffer, ext: string) {
  const name = `studai-${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
  const tmpPath = path.join(os.tmpdir(), name);
  await writeFile(tmpPath, buffer);
  return tmpPath;
}

async function runWithGeminiPdf(params: {
  pdfBuffer: Buffer;
  prompt: string;
  model: string;
  retries?: number;
}) {
  const apiKey = getGeminiKey();
  if (!apiKey) {
    throw Object.assign(
      new Error("GEMINI_API_KEY não configurada (necessária para OCR em PDF escaneado)."),
      { status: 500 }
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const retries = params.retries ?? 1;

  for (let attempt = 0; attempt <= retries; attempt++) {
    let tmpPath: string | null = null;

    try {
      tmpPath = await uploadBufferToTmpFile(params.pdfBuffer, ".pdf");

      // Upload de PDF (suporta PDF e OCR quando necessário) :contentReference[oaicite:1]{index=1}
      const myfile = await ai.files.upload({
        file: tmpPath,
        config: { mimeType: "application/pdf" },
      });

      const response = await ai.models.generateContent({
        model: params.model,
        contents: createUserContent([
          createPartFromUri(myfile.uri, myfile.mimeType),
          "\n\n",
          params.prompt,
        ]),
        config: {
          systemInstruction:
            "Você é um assistente educacional especializado em criar materiais de estudo. Responda apenas em JSON seguindo o schema.",
          responseMimeType: "application/json",
          responseJsonSchema: getStudySchema(),
        },
      });

      const raw = response.text || "";
      const parsed = safeParseJson(raw);
      if (!parsed) throw new Error("Gemini retornou JSON inválido.");
      return parsed;
    } catch (err: any) {
      const status = err?.status || err?.code;
      const msg = (err?.message || "").toString();
      const overloaded =
        status === 503 || msg.includes("overloaded") || msg.includes("UNAVAILABLE");

      if (attempt < retries && overloaded) {
        await sleep(1000 * (attempt + 1) * (attempt + 1));
        continue;
      }
      throw err;
    } finally {
      if (tmpPath) {
        await unlink(tmpPath).catch(() => {});
      }
    }
  }

  throw new Error("Falha ao gerar com Gemini a partir do PDF.");
}

function isRetryableAIError(err: any) {
  const status = err?.status || err?.code;
  const msg = (err?.message || "").toString();

  if (status === 429) return true; // rate/quota
  if (status === 503) return true; // overloaded
  if (msg.includes("overloaded") || msg.includes("UNAVAILABLE")) return true;
  if (msg.includes("insufficient_quota")) return true;
  if (msg.includes("quota")) return true;
  if (msg.includes("rate")) return true;

  return false;
}

function pickProviderOrder(): Provider[] {
  const forced = (process.env.AI_PROVIDER || "auto").toLowerCase();

  const hasOpenAI = hasValue(process.env.OPENAI_API_KEY);
  const hasGemini = hasValue(process.env.GEMINI_API_KEY) || hasValue(process.env.GOOGLE_API_KEY);

  if (forced === "gemini") {
    if (!hasGemini)
      throw Object.assign(new Error("GEMINI_API_KEY não configurada."), { status: 500 });
    return hasOpenAI ? ["gemini", "openai"] : ["gemini"];
  }

  if (forced === "openai") {
    if (!hasOpenAI)
      throw Object.assign(new Error("OPENAI_API_KEY não configurada."), { status: 500 });
    return hasGemini ? ["openai", "gemini"] : ["openai"];
  }

  // auto: Gemini primeiro (evita 429 OpenAI)
  if (hasGemini && hasOpenAI) return ["gemini", "openai"];
  if (hasGemini) return ["gemini"];
  if (hasOpenAI) return ["openai"];

  throw Object.assign(new Error("Nenhuma chave de IA encontrada."), { status: 500 });
}

// ---------- main ----------
export async function POST(request: NextRequest) {
  try {
    const current = await requireUser();

    const quota = await enforceAndIncrementUsage(current.id);
    if (!quota.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Limite do plano grátis atingido.",
          code: "FREE_LIMIT_REACHED",
          limit: FREE_MONTHLY_LIMIT,
          remaining: 0,
        },
        { status: 402 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    const flashcardsCount = Math.min(
      50,
      Math.max(1, Number(formData.get("flashcardsCount") || 10))
    );
    const summaryStyle = (formData.get("summaryStyle") || "bullet") as SummaryStyle;
    const difficulty = (formData.get("difficulty") || "medium") as CardDifficulty;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Nenhum arquivo foi enviado" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const mimeType = file.type || "application/octet-stream";
    const isPdf =
      mimeType === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isImage = mimeType.startsWith("image/");

    // evita uploads gigantes (especialmente PDF escaneado)
    const MAX_BYTES = 20 * 1024 * 1024; // 20MB
    if (buffer.length > MAX_BYTES) {
      return NextResponse.json(
        { success: false, error: "Arquivo muito grande (máx. 20MB)." },
        { status: 413 }
      );
    }

    const openaiModel = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const geminiModel = process.env.GEMINI_MODEL || "gemini-2.0-flash";
    const order = pickProviderOrder();

    let parsedResult: any = null;
    let used: Provider | null = null;
    let lastErr: any = null;

    // ---------- PDF path ----------
    if (isPdf) {
      // 1) tenta extrair texto real
      const extracted = await extractPdfText(buffer);

      if (looksLikeHasRealText(extracted)) {
        // PDF com texto: manda o texto pro modelo (sem binário!)
        const prompt = buildPromptFromText({
          text: extracted,
          flashcardsCount,
          summaryStyle,
          difficulty,
        });

        for (const provider of order) {
          try {
            if (provider === "gemini") {
              parsedResult = await runWithGeminiText({
                prompt,
                model: geminiModel,
                retries: 2,
              });
              used = "gemini";
            } else {
              parsedResult = await runWithOpenAI({
                content: [{ type: "text", text: prompt }],
                model: openaiModel,
              });
              used = "openai";
            }
            break;
          } catch (err: any) {
            lastErr = err;
            if (isRetryableAIError(err)) continue;
            throw err;
          }
        }
      } else {
        // 2) PDF sem texto (escaneado): OCR via Gemini (upload do PDF)
        const prompt = buildPromptForPdfOcr({
          flashcardsCount,
          summaryStyle,
          difficulty,
        });

        try {
          parsedResult = await runWithGeminiPdf({
            pdfBuffer: buffer,
            prompt,
            model: geminiModel,
            retries: 1,
          });
          used = "gemini";
        } catch (err: any) {
          lastErr = err;
          const msg = (err?.message || "").toString();
          return NextResponse.json(
            {
              success: false,
              error:
                "Não foi possível ler este PDF (possivelmente escaneado) agora. Verifique GEMINI_API_KEY e tente novamente.",
              details: msg,
              code: "PDF_OCR_FAILED",
            },
            { status: 503 }
          );
        }
      }
    }

    // ---------- IMAGE path ----------
    if (!parsedResult && isImage) {
      const base64 = buffer.toString("base64");

      // (para imagem, Gemini geralmente é melhor/mais barato no seu caso)
      const prompt = buildPromptForPdfOcr({
        flashcardsCount,
        summaryStyle,
        difficulty,
      }).replace(
        "Use o PDF anexado como fonte.",
        "Use a IMAGEM anexada como fonte."
      );

      for (const provider of order) {
        try {
          if (provider === "gemini") {
            const ai = new GoogleGenAI({ apiKey: getGeminiKey() });
            const response = await ai.models.generateContent({
              model: geminiModel,
              contents: [
                { inlineData: { mimeType, data: base64 } },
                { text: prompt },
              ],
              config: {
                systemInstruction:
                  "Você é um assistente educacional especializado em criar materiais de estudo. Responda apenas em JSON seguindo o schema.",
                responseMimeType: "application/json",
                responseJsonSchema: getStudySchema(),
              },
            });

            const raw = response.text || "";
            const parsed = safeParseJson(raw);
            if (!parsed) throw new Error("Gemini retornou JSON inválido.");
            parsedResult = parsed;
            used = "gemini";
          } else {
            const content = [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64}` } },
            ];
            parsedResult = await runWithOpenAI({ content, model: openaiModel });
            used = "openai";
          }
          break;
        } catch (err: any) {
          lastErr = err;
          if (isRetryableAIError(err)) continue;
          throw err;
        }
      }
    }

    // ---------- TEXT (non-pdf, non-image) path ----------
    if (!parsedResult && !isImage && !isPdf) {
      // aqui só vale se for um arquivo textual (txt/md/etc).
      // NÃO converta binário pra utf-8.
      const text = buffer.toString("utf-8").trim();

      if (!text || text.length < 50) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Não foi possível extrair texto deste arquivo. Envie um PDF, imagem, ou texto (txt/md).",
          },
          { status: 400 }
        );
      }

      const prompt = buildPromptFromText({
        text,
        flashcardsCount,
        summaryStyle,
        difficulty,
      });

      for (const provider of order) {
        try {
          if (provider === "gemini") {
            parsedResult = await runWithGeminiText({
              prompt,
              model: geminiModel,
              retries: 2,
            });
            used = "gemini";
          } else {
            parsedResult = await runWithOpenAI({
              content: [{ type: "text", text: prompt }],
              model: openaiModel,
            });
            used = "openai";
          }
          break;
        } catch (err: any) {
          lastErr = err;
          if (isRetryableAIError(err)) continue;
          throw err;
        }
      }
    }

    // ---------- post-check ----------
    if (!parsedResult) {
      const msg = (lastErr?.message || "").toString();
      return NextResponse.json(
        { success: false, error: "Falha ao gerar com IA.", details: msg },
        { status: 503 }
      );
    }

    if (!parsedResult?.topic || !parsedResult?.flashcards || !parsedResult?.summary) {
      return NextResponse.json(
        {
          success: false,
          error: "Resposta inválida do modelo (faltou topic/flashcards/summary).",
          code: "INVALID_AI_RESPONSE",
          raw: parsedResult,
        },
        { status: 502 }
      );
    }

    await prisma.studyMaterial.create({
      data: {
        userId: current.id,
        topic: String(parsedResult.topic || "Material"),
        originalFilename: file.name,
        mimeType,
        data: parsedResult,
      },
    });

    return NextResponse.json({
      success: true,
      provider: used,
      remaining: quota.limited && typeof quota.remaining === "number" ? quota.remaining : null,
      data: parsedResult,
    });
  } catch (error: any) {
    const status = error?.status || 500;
    const msg = (error?.message || "").toString();

    if (status === 401) {
      return NextResponse.json(
        { success: false, error: "Não autorizado." },
        { status: 401 }
      );
    }

    console.error("Erro ao processar arquivo:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao processar o arquivo", details: msg },
      { status: status >= 400 && status <= 599 ? status : 500 }
    );
  }
}
