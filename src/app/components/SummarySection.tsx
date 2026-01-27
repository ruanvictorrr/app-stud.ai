"use client";

import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

type Props = {
  data?: any | null;
};

type Material = {
  materialId?: string;
  topic?: string;
  flashcards?: any[];
  summary?: {
    title?: string;
    mainTopics?: Array<{ id: number; title: string; content: string; icon?: string }>;
    keyPoints?: string[];
    style?: "bullet" | "explained";
  };
};

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

async function fetchLatestMaterial(): Promise<Material | null> {
  const res = await fetch("/api/materials/latest", { method: "GET" });
  const json = await res.json();

  if (!res.ok || !json?.success) return null;
  const latest = json?.data;
  if (!latest) return null;

  const payload = latest?.data && typeof latest.data === "object" ? latest.data : null;
  if (!payload) return null;

  const material: Material = {
    ...payload,
    materialId: latest.id,
    topic: payload.topic || latest.topic || "Material",
  };

  try {
    localStorage.setItem("studai:lastMaterialData:v1", JSON.stringify(material));
  } catch {}

  return material;
}

export default function SummarySection({ data }: Props) {
  const [material, setMaterial] = useState<Material | null>(data || null);
  const [loading, setLoading] = useState<boolean>(!data);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      if (data) {
        setMaterial(data);
        setLoading(false);
        return;
      }

      setLoading(true);
      const latest = await fetchLatestMaterial();
      if (!alive) return;

      if (!latest) {
        setError("Nenhum material encontrado. Faça um upload primeiro.");
        setMaterial(null);
      } else {
        setError(null);
        setMaterial(latest);
      }

      setLoading(false);
    }

    load();
    return () => {
      alive = false;
    };
  }, [data]);

  const summary = material?.summary || null;

  const title = useMemo(() => {
    if (summary?.title) return summary.title;
    if (material?.topic) return `${material.topic} - Resumo`;
    return "Resumo";
  }, [summary?.title, material?.topic]);

  const mainTopics = useMemo(() => {
    const list = summary?.mainTopics || [];
    return Array.isArray(list) ? list : [];
  }, [summary?.mainTopics]);

  const keyPoints = useMemo(() => {
    const list = summary?.keyPoints || [];
    return Array.isArray(list) ? list : [];
  }, [summary?.keyPoints]);

  if (loading) {
    return (
      <section className="w-full">
        <div className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-6 text-gray-300">
          Carregando resumo...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full">
        <div className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-6 text-red-300">
          {error}
        </div>
      </section>
    );
  }

  if (!summary) {
    return (
      <section className="w-full">
        <div className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-6 text-gray-300">
          Nenhum resumo encontrado neste material.
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00FF8B]/25 bg-[#00FF8B]/10 px-3 py-1 text-xs font-semibold text-[#00FF8B]">
            <Sparkles className="w-4 h-4" />
            Gerado por IA
          </div>

          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
            {title}
          </h2>

          {material?.materialId ? (
            <div className="mt-2 text-[11px] text-gray-500 break-all">
              materialId: <span className="font-mono">{material.materialId}</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Main topics */}
      <div className="space-y-4">
        {mainTopics.map((t) => (
          <div
            key={t.id}
            className={cn(
              "rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-5",
              "shadow-[0_0_0_1px_rgba(0,255,139,0.06)]"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00FF8B]/10 border border-[#00FF8B]/15">
                <span className="text-lg">{t.icon || "📌"}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-[#00FF8B]">
                  TÓPICO {t.id}
                </div>
                <div className="mt-1 text-lg font-semibold text-white">
                  {t.title}
                </div>
                <div className="mt-2 text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {t.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key points */}
      {keyPoints.length ? (
        <div className="mt-6 rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-5">
          <div className="text-sm font-semibold text-white mb-3">Pontos-chave</div>
          <ul className="space-y-2">
            {keyPoints.map((k, i) => (
              <li key={i} className="text-sm text-gray-200 flex gap-2">
                <span className="text-[#00FF8B]">•</span>
                <span className="whitespace-pre-wrap">{k}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
