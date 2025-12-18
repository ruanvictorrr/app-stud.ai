"use client";

import { useEffect, useMemo, useState } from "react";
import { loadMaterial, onMaterialUpdated } from "@/lib/studyMaterialStore";
import { makeProgressKey, loadProgress, onProgressUpdated, clearProgress } from "@/lib/studyProgressStore";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}
function pct(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}
function uniq(arr: number[]) {
  return Array.from(new Set(arr));
}

export default function ProgressSection() {
  const [topic, setTopic] = useState<string>("");
  const [totalCards, setTotalCards] = useState<number>(0);
  const [progressKey, setProgressKey] = useState<string>("");

  const [knownIds, setKnownIds] = useState<number[]>([]);
  const [reviewIds, setReviewIds] = useState<number[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    const refresh = () => {
      const m = loadMaterial();
      const count = m?.flashcards?.length ?? 0;

      setTopic(m?.topic ?? "");
      setTotalCards(count);

      const key = makeProgressKey(m?.topic ?? "deck", count);
      setProgressKey(key);

      const p = loadProgress(key);
      setKnownIds(p?.knownIds ?? []);
      setReviewIds(p?.reviewIds ?? []);
      setUpdatedAt(p?.updatedAt ?? null);
    };

    refresh();
    const off1 = onMaterialUpdated(refresh);
    const off2 = onProgressUpdated(refresh);
    return () => {
      off1?.();
      off2?.();
    };
  }, []);

  const known = useMemo(() => new Set(knownIds), [knownIds]);
  const review = useMemo(() => new Set(reviewIds), [reviewIds]);

  const doneCount = uniq([...knownIds, ...reviewIds]).length;
  const donePct = totalCards ? pct((doneCount / totalCards) * 100) : 0;

  const knownCount = known.size;
  const reviewCount = review.size;
  const remainingCount = Math.max(0, totalCards - doneCount);

  if (!totalCards) {
    return (
      <section className="w-full max-w-5xl mx-auto mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <h2 className="text-2xl font-semibold">Progresso</h2>
        <p className="mt-2 opacity-70">Gere um material (upload) para acompanhar seu progresso.</p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-5xl mx-auto mt-10">
      {/* Header premium */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="text-xs opacity-70">Progresso</div>
            <h2 className="text-2xl font-semibold mt-1">{topic || "Seu deck"}</h2>
            <div className="mt-2 text-sm opacity-70">
              Acompanhe seu avanço no mesmo padrão visual do Flashcards.
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Chip tone="green" label={`✅ Conhecidos: ${knownCount}`} />
            <Chip tone="red" label={`❌ Revisar: ${reviewCount}`} />
            <Chip tone="neutral" label={`⏳ Restantes: ${remainingCount}`} />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs opacity-70">
            <span>Progresso geral</span>
            <span>{donePct}%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-black/30 overflow-hidden border border-white/10">
            <div className="h-full rounded-full bg-[#00FF8B]/70" style={{ width: `${donePct}%` }} />
          </div>

          <div className="mt-3 text-xs opacity-60">
            {updatedAt ? `Última atualização: ${new Date(updatedAt).toLocaleString()}` : "Ainda sem atualizações"}
          </div>
        </div>

        {/* Action row */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm opacity-70">
            Total de cards: <b className="opacity-90">{totalCards}</b> • Concluídos:{" "}
            <b className="opacity-90">{doneCount}</b>
          </div>

          <button
            onClick={() => {
              if (!progressKey) return;
              clearProgress(progressKey);
            }}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm hover:bg-white/10"
          >
            Limpar progresso deste deck
          </button>
        </div>
      </div>

      {/* Breakdown premium */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Conhecidos" value={knownCount} subtitle="Você marcou como acertei" tone="green" />
        <StatCard title="Revisar" value={reviewCount} subtitle="Precisa reforçar" tone="red" />
        <StatCard title="Restantes" value={remainingCount} subtitle="Ainda não avaliados" tone="neutral" />
      </div>

      {/* Dica */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="font-semibold">Dica de estudo</div>
        <p className="mt-2 opacity-70 leading-relaxed">
          Use sessões curtas (10–20 cards) e marque “Revisar” sem medo. O ideal é voltar nesses cards no dia seguinte.
        </p>
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

function StatCard({
  title,
  value,
  subtitle,
  tone,
}: {
  title: string;
  value: number;
  subtitle: string;
  tone: "green" | "red" | "neutral";
}) {
  const border =
    tone === "green"
      ? "border-[#00FF8B]/20"
      : tone === "red"
      ? "border-red-500/20"
      : "border-white/10";

  const bg =
    tone === "green"
      ? "bg-[#00FF8B]/10"
      : tone === "red"
      ? "bg-red-500/10"
      : "bg-black/20";

  const text =
    tone === "green" ? "text-[#00FF8B]" : tone === "red" ? "text-red-200" : "text-white/80";

  return (
    <div className={cn("rounded-2xl border bg-white/5 p-6", border)}>
      <div className="text-xs opacity-70">{title}</div>
      <div className={cn("mt-2 text-3xl font-bold", text)}>{value}</div>
      <div className={cn("mt-3 rounded-xl border p-3 text-sm opacity-90", border, bg)}>{subtitle}</div>
    </div>
  );
}
