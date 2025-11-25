import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo foi enviado" },
        { status: 400 }
      );
    }

    // Converter arquivo para base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const mimeType = file.type;

    // Verificar se é imagem
    const isImage = mimeType.startsWith("image/");

    let content: any[] = [];

    if (isImage) {
      // Para imagens, usar Vision API
      content = [
        {
          type: "text",
          text: `Analise esta imagem de material de estudo e extraia o conteúdo educacional.
          
          Retorne um JSON com a seguinte estrutura:
          {
            "topic": "Tópico principal do material",
            "flashcards": [
              {
                "id": 1,
                "question": "Pergunta clara e objetiva",
                "answer": "Resposta completa e educativa"
              }
            ],
            "summary": {
              "title": "Título do resumo",
              "mainTopics": [
                {
                  "id": 1,
                  "title": "Título do tópico",
                  "content": "Conteúdo detalhado do tópico",
                  "icon": "emoji apropriado"
                }
              ],
              "keyPoints": ["ponto-chave 1", "ponto-chave 2"]
            }
          }
          
          Crie pelo menos 5 flashcards e 3-4 tópicos principais. Seja educativo e completo.`,
        },
        {
          type: "image_url",
          image_url: {
            url: `data:${mimeType};base64,${base64}`,
          },
        },
      ];
    } else {
      // Para textos/PDFs, extrair texto primeiro (simplificado)
      const textContent = buffer.toString("utf-8");
      content = [
        {
          type: "text",
          text: `Analise este conteúdo de estudo e crie material educacional:

${textContent.substring(0, 4000)}

Retorne um JSON com a seguinte estrutura:
{
  "topic": "Tópico principal do material",
  "flashcards": [
    {
      "id": 1,
      "question": "Pergunta clara e objetiva",
      "answer": "Resposta completa e educativa"
    }
  ],
  "summary": {
    "title": "Título do resumo",
    "mainTopics": [
      {
        "id": 1,
        "title": "Título do tópico",
        "content": "Conteúdo detalhado do tópico",
        "icon": "emoji apropriado"
      }
    ],
    "keyPoints": ["ponto-chave 1", "ponto-chave 2"]
  }
}

Crie pelo menos 5 flashcards e 3-4 tópicos principais. Seja educativo e completo.`,
        },
      ];
    }

    // Chamar OpenAI GPT-4o
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Você é um assistente educacional especializado em criar materiais de estudo. Sempre retorne respostas em JSON válido.",
        },
        {
          role: "user",
          content: content,
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 2000,
    });

    const result = completion.choices[0].message.content;
    const parsedResult = JSON.parse(result || "{}");

    return NextResponse.json({
      success: true,
      data: parsedResult,
    });
  } catch (error: any) {
    console.error("Erro ao processar arquivo:", error);
    return NextResponse.json(
      {
        error: "Erro ao processar o arquivo",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
