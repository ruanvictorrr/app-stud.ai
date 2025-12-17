import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

type Provider = "openai" | "gemini";
type Difficulty = "easy" | "medium" | "hard" | "random";
type SummaryStyle = "bullets" | "detailed";

function clampInt(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, Math.trunc(n)));
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function getGeminiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
}

function pickProvider(): Provider {
  const forced = (process.env.AI_PROVIDER || "auto").toLowerCase();
  if (forced === "openai") return "openai";
  if (forced === "gemini") return "gemini";

  // auto
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim()) return "openai";
  if (getGeminiKey().trim()) return "gemini";

  throw new Error(
    "Nenhuma chave encontrada. Defina OPENAI_API_KEY ou GEMINI_API_KEY/GOOGLE_API_KEY no .env.local e reinicie o servidor."
  );
}

function getStudySchema() {
  // Schema “flexível” (não trava por campos extras)
  return {
    type: "object",
    required: ["topic", "flashcards", "summary"],
    properties: {
      topic: { type: "string" },
      tags: { type: "array", items: { type: "string" } },

      flashcards: {
        type: "array",
        items: {
          type: "object",
          required: ["id", "question", "answer"],
          properties: {
            id: { type: "integer" },
            question: { type: "string" },
            answer: { type: "string" },
            difficulty: { type: "string" }, // "easy"|"medium"|"hard"
            tags: { type: "array", items: { type: "string" } },
          },
        },
      },

      summary: {
        type: "object",
        required: ["title", "mainTopics", "keyPoints"],
        properties: {
          title: { type: "string" },
          length: { type: "string" }, // "short"|"medium"|"long" (opcional)
          mainTopics: {
            type: "array",
            items: {
              type: "object",
              required: ["id", "title", "content", "icon"],
              properties: {
                id: { type: "integer" },
                title: { type: "string" },
                content: { type: "string" },
                icon: { type: "string" },
                tags: { type: "array", items: { type: "string" } },
              },
            },
          },
          keyPoints: { type: "array", items: { type: "string" } },

          // opcional (se você quiser usar na UI)
          sourceQuotes: {
            type: "array",
            items: {
              type: "object",
              required: ["quote", "whyItMatters"],
              properties: {
                quote: { type: "string" },
                whyItMatters: { type: "string" },
              },
            },
          },
        },
      },
    },
  };
}

function buildPromptText(params: {
  flashcardsCount: number;
  difficulty: Difficulty;
  summaryStyle: SummaryStyle;
  isImage: boolean;
  isPdf: boolean;
  textSnippet?: string;
}) {
  const diffText =
    params.difficulty === "random"
      ? "Misture dificuldades (easy/medium/hard) e preencha o campo difficulty em cada flashcard."
      : `Use difficulty="${params.difficulty}" em todos os flashcards.`;

  const summaryText =
    params.summaryStyle === "bullets"
      ? "No resumo, escreva de forma objetiva (bullets curtos e diretos)."
      : "No resumo, escreva de forma mais elaborada e explicativa (parágrafos claros, exemplos rápidos quando útil).";

  const base = `Você é um assistente educacional. Analise o material de estudo e gere um JSON ESTRITAMENTE válido (apenas JSON, sem markdown, sem texto fora do JSON).

Regras:
- Crie EXATAMENTE ${params.flashcardsCount} flashcards.
- ${diffText}
- ${summaryText}
- Inclua tags relevantes no nível raiz (tags) se fizer sentido.
- Use emojis apropriados no campo icon de cada tópico do resumo.
- Preencha summary.length com "short", "medium" ou "long" (estimativa).
- Não invente fatos: se algo não estiver no material, deixe mais genérico.

Formato obrigatório do JSON:
{
  "topic": "Tópico principal do material",
  "tags": ["tag1", "tag2"],
  "flashcards": [
    { "id": 1, "question": "...", "answer": "...", "difficulty": "easy" }
  ],
  "summary": {
    "title": "Título do resumo",
    "length": "short|medium|long",
    "mainTopics": [
      { "id": 1, "title": "...", "content": "...", "icon": "📌" }
    ],
    "keyPoints": ["ponto-chave 1", "ponto-chave 2"],
    "sourceQuotes": [
      { "quote": "...", "whyItMatters": "..." }
    ]
  }
}`;

  // Para texto puro, anexamos snippet (até 4000 chars)
  if (!params.isImage && !params.isPdf) {
    const snippet = (params.textSnippet || "").slice(0, 4000);
    return `Material (trecho):
${snippet}

${base}`;
  }

  // Para imagem/PDF: o arquivo vai junto no request (inlineData ou image_url)
  return base;
}

async function runWithOpenAI(params: { content: any[]; model: string }) {
  const key = process.env.OPENAI_API_KEY || "";
  if (!key.trim()) {
    throw new Error("OPENAI_API_KEY ausente. Defina no .env.local ou use Gemini.");
  }

  const openai = new OpenAI({ apiKey: key });

  const completion = await openai.chat.completions.create({
    model: params.model,
    messages: [
      {
        role: "system",
        content:
          "Você é um assistente educacional especializado em criar materiais de estudo. Responda sempre em JSON válido.",
      },
      { role: "user", content: params.content },
    ],
    response_format: { type: "json_object" },
    max_tokens: 2200,
  });

  const raw = completion.choices[0]?.message?.content || "{}";
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("OpenAI retornou JSON inválido.");
  }
}

async function runWithGeminiOnce(params: {
  model: string;
  prompt: string;
  isImage: boolean;
  isPdf: boolean;
  mimeType: string;
  base64: string;
}) {
  const apiKey = getGeminiKey();
  if (!apiKey.trim()) {
    throw new Error("GEMINI_API_KEY/GOOGLE_API_KEY ausente. Defina no .env.local ou use OpenAI.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // ✅ Formato oficial para inlineData (imagem) no JS SDK:
  // contents = [{ inlineData:{mimeType,data} }, { text:"..." }]
  // (funciona igual para PDF inline)
  const contents = params.isImage || params.isPdf
    ? [
        {
          inlineData: {
            mimeType: params.mimeType,
            data: params.base64,
          },
        },
        { text: params.prompt },
      ]
    : [{ text: params.prompt }];

  const resp = await ai.models.generateContent({
    model: params.model,
    contents,
    config: {
      systemInstruction:
        "Você é um assistente educacional especializado em criar materiais de estudo. Responda seguindo o schema e apenas em JSON.",
      responseMimeType: "application/json",
      responseJsonSchema: getStudySchema(),
    },
  });

  const raw = resp.text || "";
  if (!raw.trim()) throw new Error("Gemini retornou resposta vazia.");
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("Gemini retornou JSON inválido.");
  }
}

async function runWithGeminiFallback(params: {
  prompt: string;
  isImage: boolean;
  isPdf: boolean;
  mimeType: string;
  base64: string;
}) {
  const preferred = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  // ✅ Lista segura (evita gemini-1.5-flash que está dando 404)
  const models = [
    preferred,
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-flash-latest",
  ].filter(Boolean);

  let lastErr: any = null;

  // retry para 503 (overloaded), e troca de modelo para 404 (not found)
  for (const model of models) {
    const retries = 2; // total 3 tentativas (0,1,2)
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await runWithGeminiOnce({ model, ...params });
      } catch (e: any) {
        lastErr = e;

        const msg = String(e?.message || "");
        const status = e?.status;

        // 404: tenta o próximo modelo
        if (status === 404 || msg.includes("is not found") || msg.includes("NOT_FOUND")) {
          break;
        }

        // 503: backoff e tenta de novo no mesmo modelo
        if (status === 503 || msg.includes("overloaded") || msg.includes("UNAVAILABLE")) {
          const backoff = 900 * Math.pow(2, attempt) + Math.floor(Math.random() * 250);
          await sleep(backoff);
          continue;
        }

        // outros erros: sobe
        throw e;
      }
    }
  }

  throw lastErr || new Error("Falha ao chamar Gemini (todos os modelos falharam).");
}

export async function POST(request: NextRequest) {
  try {
    const provider = pickProvider();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "Nenhum arquivo foi enviado" }, { status: 400 });
    }

    const flashcardsCount = clampInt(Number(formData.get("flashcardsCount") || 10), 1, 50);
    const difficulty = String(formData.get("flashcardsDifficulty") || "random") as Difficulty;
    const summaryStyle = String(formData.get("summaryStyle") || "bullets") as SummaryStyle;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const mimeType = file.type || "application/octet-stream";
    const base64 = buffer.toString("base64");

    const isImage = mimeType.startsWith("image/");
    const isPdf = mimeType === "application/pdf";

    // Texto (apenas para text/plain etc). PDF a gente manda inline pro Gemini.
    const textSnippet = !isImage && !isPdf ? buffer.toString("utf-8") : undefined;

    const prompt = buildPromptText({
      flashcardsCount,
      difficulty,
      summaryStyle,
      isImage,
      isPdf,
      textSnippet,
    });

    let parsedResult: any;

    if (provider === "openai") {
      const model = process.env.OPENAI_MODEL || "gpt-4o";

      const content = isImage
        ? [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64}` } },
          ]
        : [{ type: "text", text: prompt }];

      parsedResult = await runWithOpenAI({ content, model });
    } else {
      // Gemini (recomendado p/ PDF e pra evitar OPENAI_API_KEY)
      parsedResult = await runWithGeminiFallback({
        prompt,
        isImage,
        isPdf,
        mimeType,
        base64,
      });
    }

    return NextResponse.json({ success: true, data: parsedResult });
  } catch (error: any) {
    console.error("Erro ao processar arquivo:", error);
    const status = error?.status === 503 ? 503 : 500;
    return NextResponse.json(
      { success: false, error: "Erro ao processar o arquivo", details: error?.message || String(error) },
      { status }
    );
  }
}
