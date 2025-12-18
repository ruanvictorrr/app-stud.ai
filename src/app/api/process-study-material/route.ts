import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

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

/** Pega status/code e retryDelay mesmo quando vem JSON dentro de message */
function parseGeminiError(err: any): { status: number | null; message: string; retryAfterSeconds: number | null } {
  const rawMsg = String(err?.message || err || "");
  const statusFromObj =
    (typeof err?.status === "number" && err.status) ||
    (typeof err?.code === "number" && err.code) ||
    null;

  let status: number | null = statusFromObj;
  let message = rawMsg;
  let retryAfterSeconds: number | null = null;

  // tenta extrair JSON dentro da mensagem
  const start = rawMsg.indexOf("{");
  const end = rawMsg.lastIndexOf("}");
  if (start >= 0 && end > start) {
    const slice = rawMsg.slice(start, end + 1);
    try {
      const parsed = JSON.parse(slice);
      const apiErr = parsed?.error;
      if (apiErr) {
        if (typeof apiErr.code === "number") status = apiErr.code;
        if (typeof apiErr.message === "string") message = apiErr.message;

        const details = Array.isArray(apiErr.details) ? apiErr.details : [];
        const retryInfo = details.find((d: any) => String(d?.["@type"] || "").includes("RetryInfo"));
        const retryDelay = retryInfo?.retryDelay;
        if (retryDelay) {
          const m = String(retryDelay).match(/([0-9]+(?:\.[0-9]+)?)\s*s/i);
          if (m) retryAfterSeconds = Math.ceil(Number(m[1]));
        }
      }
    } catch {
      // ignore
    }
  }

  // fallback: "Please retry in XXs"
  if (!retryAfterSeconds) {
    const m2 = rawMsg.match(/retry in\s+([0-9.]+)s/i);
    if (m2) retryAfterSeconds = Math.ceil(Number(m2[1]));
  }

  return { status, message, retryAfterSeconds };
}

function isQuota429(err: any) {
  const p = parseGeminiError(err);
  if (p.status === 429) return true;
  const msg = p.message.toLowerCase();
  return msg.includes("quota exceeded") || msg.includes("resource_exhausted");
}

function isNotFound404(err: any) {
  const p = parseGeminiError(err);
  if (p.status === 404) return true;
  return p.message.toLowerCase().includes("not found");
}

function isOverloaded503(err: any) {
  const p = parseGeminiError(err);
  if (p.status === 503) return true;
  const msg = p.message.toLowerCase();
  return msg.includes("overloaded") || msg.includes("unavailable");
}

function getStudySchema() {
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
            difficulty: { type: "string" },
            tags: { type: "array", items: { type: "string" } },
          },
        },
      },
      summary: {
        type: "object",
        required: ["title", "mainTopics", "keyPoints"],
        properties: {
          title: { type: "string" },
          length: { type: "string" },
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
      ? "Misture dificuldades (easy/medium/hard) e preencha difficulty em cada flashcard."
      : `Use difficulty="${params.difficulty}" em todos os flashcards.`;

  const summaryText =
    params.summaryStyle === "bullets"
      ? "Resumo objetivo em bullets curtos."
      : "Resumo elaborado e explicativo (parágrafos didáticos).";

  const base = `Gere APENAS JSON válido (sem markdown, sem texto fora do JSON).

Regras:
- Crie EXATAMENTE ${params.flashcardsCount} flashcards.
- ${diffText}
- ${summaryText}
- Preencha summary.length com "short", "medium" ou "long".
- Use emojis em icon.

Formato:
{
  "topic": "Tópico principal",
  "tags": ["tag1"],
  "flashcards": [{ "id": 1, "question": "...", "answer": "...", "difficulty": "easy" }],
  "summary": {
    "title": "Título",
    "length": "short|medium|long",
    "mainTopics": [{ "id": 1, "title": "...", "content": "...", "icon": "📌" }],
    "keyPoints": ["..."],
    "sourceQuotes": [{ "quote": "...", "whyItMatters": "..." }]
  }
}`;

  if (!params.isImage && !params.isPdf) {
    const snippet = (params.textSnippet || "").slice(0, 4000);
    return `Material (trecho):\n${snippet}\n\n${base}`;
  }
  return base;
}

async function runGeminiOnce(params: {
  model: string;
  prompt: string;
  mimeType: string;
  base64: string;
  isImage: boolean;
  isPdf: boolean;
}) {
  const apiKey = getGeminiKey();
  if (!apiKey.trim()) throw new Error("GEMINI_API_KEY/GOOGLE_API_KEY ausente no .env.local.");

  const ai = new GoogleGenAI({ apiKey });

  const contents =
    params.isImage || params.isPdf
      ? [
          { inlineData: { mimeType: params.mimeType, data: params.base64 } },
          { text: params.prompt },
        ]
      : [{ text: params.prompt }];

  const resp = await ai.models.generateContent({
    model: params.model,
    contents,
    config: {
      systemInstruction: "Você é um assistente educacional. Responda apenas em JSON conforme o schema.",
      responseMimeType: "application/json",
      responseJsonSchema: getStudySchema(),
    },
  });

  const raw = resp.text || "";
  if (!raw.trim()) throw new Error("Gemini retornou resposta vazia.");
  return JSON.parse(raw);
}

async function runGeminiWithFallback(params: {
  prompt: string;
  mimeType: string;
  base64: string;
  isImage: boolean;
  isPdf: boolean;
}) {
  // ✅ Lite primeiro. Preferido vem do .env (recomendado: gemini-2.0-flash-lite)
  const preferred = process.env.GEMINI_MODEL || "gemini-2.0-flash-lite";
  const models = [
    preferred,
    "gemini-2.0-flash-lite",
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash",
    "gemini-2.5-flash",
    "gemini-flash-latest",
  ].filter(Boolean);

  let lastErr: any = null;
  let lastQuota: { retryAfterSeconds: number | null; message: string } | null = null;

  for (const model of models) {
    // retry só para 503
    const retries503 = 2;

    for (let attempt = 0; attempt <= retries503; attempt++) {
      try {
        return await runGeminiOnce({ model, ...params });
      } catch (e: any) {
        lastErr = e;

        // 404 => tenta próximo modelo
        if (isNotFound404(e)) break;

        // 429 => guarda info e tenta próximo modelo (SEM esperar 40s no backend)
        if (isQuota429(e)) {
          const p = parseGeminiError(e);
          lastQuota = { retryAfterSeconds: p.retryAfterSeconds, message: p.message };
          break;
        }

        // 503 => retry com backoff
        if (isOverloaded503(e)) {
          const backoff = 900 * Math.pow(2, attempt) + Math.floor(Math.random() * 250);
          await sleep(backoff);
          continue;
        }

        // outro erro => sobe
        throw e;
      }
    }
  }

  // Se tudo caiu em quota, sobe um erro especial (pra virar 429 na resposta)
  if (lastQuota) {
    const err: any = new Error(lastQuota.message || "Quota exceeded");
    err.status = 429;
    err.retryAfterSeconds = lastQuota.retryAfterSeconds ?? 45;
    throw err;
  }

  throw lastErr || new Error("Falha ao chamar Gemini (todos os modelos falharam).");
}

export async function POST(request: NextRequest) {
  try {
    // Só gemini aqui (você está usando a key do Google)
    const apiKey = getGeminiKey();
    if (!apiKey.trim()) {
      return NextResponse.json(
        { success: false, error: "Defina GEMINI_API_KEY/GOOGLE_API_KEY no .env.local." },
        { status: 500 }
      );
    }

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
    const textSnippet = !isImage && !isPdf ? buffer.toString("utf-8") : undefined;

    const prompt = buildPromptText({
      flashcardsCount,
      difficulty,
      summaryStyle,
      isImage,
      isPdf,
      textSnippet,
    });

    const data = await runGeminiWithFallback({ prompt, mimeType, base64, isImage, isPdf });
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Erro ao processar arquivo:", error);

    // ✅ Se for quota, responde 429 (NÃO 500)
    if (error?.status === 429 || isQuota429(error)) {
      const p = parseGeminiError(error);
      const retrySec = error?.retryAfterSeconds ?? p.retryAfterSeconds ?? 45;

      return NextResponse.json(
        {
          success: false,
          error: "Limite da cota do Gemini atingido (tier grátis).",
          details: p.message,
          retryAfterSeconds: retrySec,
        },
        { status: 429, headers: { "Retry-After": String(retrySec) } }
      );
    }

    const p = parseGeminiError(error);
    const status = p.status === 503 ? 503 : 500;

    return NextResponse.json(
      { success: false, error: "Erro ao processar o arquivo", details: p.message },
      { status }
    );
  }
}
