"use client";

import { useEffect, useMemo, useState } from "react";
import { loadMaterial, onMaterialUpdated, StudySummary } from "@/lib/studyMaterialStore";

type Props = { data?: any };

function lengthLabel(l: string) {
  if (l === "short") return "Curto";
  if (l === "long") return "Longo";
  return "Médio";
}

// Estima o "tamanho" caso sua API não retorne summary.length
function estimateLength(summary: any): "short" | "medium" | "long" {
  const parts: string[] = [];
  if (summary?.title) parts.push(String(summary.title));

  const mainTopics = Array.isArray(summary?.mainTopics) ? summary.mainTopics : [];
  for (const t of mainTopics) {
    parts.push(String(t?.title || ""));
    parts.push(String(t?.content || ""));
  }

  const keyPoints = Array.isArray(summary?.keyPoints) ? summary.keyPoints : [];
  for (const k of keyPoints) parts.push(String(k || ""));

  const size = parts.join(" ").trim().length;
  if (size < 900) return "short";
  if (size > 2200) return "long";
  return "medium";
}

export default function SummarySection({ data }: Props) {
  const [topic, setTopic] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [summary, setSummary] = useState<StudySummary | null>(null);

  // 1) Se veio data do upload, usa imediatamente
  useEffect(() => {
    if (!data) return;

    const payload = data?.topic ? data : data?.data?.topic ? data.data : data;
    setTopic(payload?.topic ?? "");
    setTags(payload?.tags ?? []);
    setSummary(payload?.summary ?? null);
  }, [data]);

  // 2) Fallback: carrega do store (localStorage) + live update
  useEffect(() => {
    const refresh = () => {
      const m = loadMaterial();
      if (!m) return;
      setTopic(m.topic ?? "");
      setTags(m.tags ?? []);
      setSummary(m.summary ?? null);
    };

    // Só faz refresh inicial se não tiver summary vindo por props
    if (!data) refresh();

    return onMaterialUpdated(refresh);
  }, [data]);

  const mainTopics = useMemo(() => {
    const arr = (summary as any)?.mainTopics;
    return Array.isArray(arr) ? arr : [];
  }, [summary]);

  const keyPoints = useMemo(() => {
    const arr = (summary as any)?.keyPoints;
    return Array.isArray(arr) ? arr : [];
  }, [summary]);

  const sourceQuotes = useMemo(() => {
    const arr = (summary as any)?.sourceQuotes;
    return Array.isArray(arr) ? arr : [];
  }, [summary]);

  const lengthValue = useMemo(() => {
    const l = (summary as any)?.length;
    return typeof l === "string" ? l : estimateLength(summary);
  }, [summary]);

  if (!summary) {
    return (
      <section className="w-full max-w-5xl mx-auto mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <h2 className="text-2xl font-semibold">Resumos</h2>
        <p className="mt-2 opacity-70">Faça um upload para gerar um resumo automaticamente.</p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-5xl mx-auto mt-10">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm opacity-80">
          📝 Resumo gerado • {lengthLabel(lengthValue)}
        </div>

        <h2 className="text-3xl font-semibold mt-4">
          {topic ? `${topic} — ${summary.title}` : summary.title}
        </h2>

        {tags?.length ? (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {tags.slice(0, 12).map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full border border-white/10 bg-black/10 opacity-80"
              >
                #{t}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {/* Tópicos principais */}
      <div className="mt-8 space-y-4">
        {mainTopics.map((t: any) => (
          <div key={t.id ?? t.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3">
              <div className="text-xl">{t.icon || "📘"}</div>
              <div className="font-semibold text-lg">{t.title}</div>
            </div>

            {/* tags opcionais no tópico (se existir) */}
            {Array.isArray(t?.tags) && t.tags.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {t.tags.slice(0, 10).map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full border border-white/10 bg-black/10 opacity-80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}

            <p className="mt-4 opacity-80 leading-relaxed">{t.content}</p>
          </div>
        ))}
      </div>

      {/* Pontos-chave */}
      {keyPoints.length ? (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">Pontos-chave</h3>
          <ul className="mt-4 list-disc pl-6 space-y-2 opacity-80">
            {keyPoints.map((k: string, i: number) => (
              <li key={i}>{k}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Citações/Evidências (opcional, só se existir sourceQuotes) */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-lg font-semibold">Trechos do material</h3>
          <div className="text-sm opacity-70">
            {sourceQuotes.length ? `${sourceQuotes.length} trecho(s)` : "Sem trechos disponíveis"}
          </div>
        </div>

        {!sourceQuotes.length ? (
          <p className="mt-3 opacity-70">
            Se o arquivo for imagem com texto pouco legível, ou PDF sem extração de texto, a IA pode não conseguir citar.
          </p>
        ) : (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {sourceQuotes.map((q: any, i: number) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-black/10 p-5">
                <div className="text-sm opacity-70">Trecho</div>
                <p className="mt-2 italic opacity-90">“{q.quote}”</p>
                <div className="mt-4 text-sm opacity-70">Por que importa</div>
                <p className="mt-2 opacity-80">{q.whyItMatters}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
