"use client";

import { useEffect, useMemo, useState } from "react";
import { loadMaterial, onMaterialUpdated } from "@/lib/studyMaterialStore";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

function lengthLabel(l?: string) {
  if (l === "short") return "Curto";
  if (l === "long") return "Longo";
  if (l === "medium") return "Médio";
  return "—";
}

export default function SummarySection(_props: { data?: any }) {
  const [topic, setTopic] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    const refresh = () => {
      const m = loadMaterial();
      setTopic(m?.topic ?? "");
      setTags(m?.tags ?? []);
      setSummary(m?.summary ?? null);
      setOpenId(m?.summary?.mainTopics?.[0]?.id ?? null);
    };

    refresh();
    return onMaterialUpdated(refresh);
  }, []);

  const hasQuotes = useMemo(() => (summary?.sourceQuotes?.length ?? 0) > 0, [summary]);
  const length = lengthLabel(summary?.length);

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
      {/* Header premium */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="text-xs opacity-70">Resumo</div>
            <h2 className="text-2xl font-semibold mt-1">
              {topic ? `${topic} — ${summary.title}` : summary.title}
            </h2>
            <div className="mt-2 text-sm opacity-70">
              Leitura rápida + tópicos principais no padrão do app.
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Chip tone="green" label={`📝 ${length}`} />
            <Chip tone="neutral" label={`📌 ${summary?.mainTopics?.length ?? 0} tópicos`} />
            <Chip
              tone="neutral"
              label={hasQuotes ? `🔎 ${summary.sourceQuotes.length} trechos` : "🔎 sem trechos"}
            />
          </div>
        </div>

        {tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.slice(0, 12).map((t: string) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full border border-white/10 bg-black/20 text-white/70"
              >
                #{t}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {/* Tópicos (accordion premium) */}
      <div className="mt-6 space-y-3">
        {(summary.mainTopics || []).map((t: any) => {
          const opened = openId === t.id;
          return (
            <div key={t.id} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <button
                onClick={() => setOpenId(opened ? null : t.id)}
                className="w-full flex items-center justify-between gap-3 p-5 hover:bg-white/5"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="text-xl">{t.icon || "📘"}</div>
                  <div>
                    <div className="font-semibold">{t.title}</div>
                    {Array.isArray(t.tags) && t.tags.length ? (
                      <div className="mt-1 text-xs opacity-70">
                        {t.tags.slice(0, 4).map((x: string) => `#${x}`).join("  ")}
                      </div>
                    ) : (
                      <div className="mt-1 text-xs opacity-60">Clique para expandir</div>
                    )}
                  </div>
                </div>

                <div className={cn("text-xs opacity-70", opened && "opacity-100")}>
                  {opened ? "Fechar" : "Abrir"}
                </div>
              </button>

              {opened ? (
                <div className="px-5 pb-5">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="opacity-90 leading-relaxed whitespace-pre-wrap">{t.content}</p>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Pontos-chave (cards) */}
      {summary.keyPoints?.length ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h3 className="text-lg font-semibold">Pontos-chave</h3>
            <span className="text-xs opacity-70">{summary.keyPoints.length} itens</span>
          </div>

          <ul className="mt-4 space-y-2">
            {summary.keyPoints.map((k: string, i: number) => (
              <li key={i} className="rounded-xl border border-white/10 bg-black/20 p-3 opacity-90">
                {k}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Trechos/Evidências */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-lg font-semibold">Trechos do material</h3>
          <div className="text-xs opacity-70">
            {hasQuotes ? `${summary.sourceQuotes.length} trecho(s)` : "Sem trechos disponíveis"}
          </div>
        </div>

        {!hasQuotes ? (
          <p className="mt-3 opacity-70">
            Se o arquivo for imagem com texto pouco legível ou PDF sem extração, a IA pode não conseguir citar.
          </p>
        ) : (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {summary.sourceQuotes.map((q: any, i: number) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-xs opacity-70">Trecho</div>
                <p className="mt-2 italic opacity-90">“{q.quote}”</p>
                <div className="mt-4 text-xs opacity-70">Por que importa</div>
                <p className="mt-2 opacity-85">{q.whyItMatters}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Chip({ label, tone }: { label: string; tone: "green" | "red" | "neutral" }) {
  const cls =
    tone === "green"
      ? "border-[#00FF8B]/25 bg-[#00FF8B]/10 text-[#00FF8B]"
      : tone === "red"
      ? "border-red-500/25 bg-red-500/10 text-red-200"
      : "border-white/10 bg-black/20 text-white/70";
  return <span className={cn("text-xs px-3 py-1 rounded-full border", cls)}>{label}</span>;
}
