"use client";

import { useEffect, useMemo, useState } from "react";
import { loadMaterial, onMaterialUpdated, Flashcard } from "@/lib/studyMaterialStore";
import { makeProgressKey, loadProgress, onProgressUpdated, clearProgress } from "@/lib/studyProgressStore";

function pct(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function labelDifficulty(d: string) {
  if (d === "easy") return "Fácil";
  if (d === "hard") return "Difícil";
  return "Médio";
}

export default function ProgressSection() {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [knownIds, setKnownIds] = useState<number[]>([]);
  const [reviewIds, setReviewIds] = useState<number[]>([]);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);

  const key = useMemo(() => makeProgressKey(topic, cards.length), [topic, cards.length]);

  const refresh = () => {
    const m = loadMaterial();
    const t = m?.topic ?? "";
    const c = m?.flashcards ?? [];

    setTopic(t);
    setCards(c);

    const k = makeProgressKey(t, c.length);
    const p = loadProgress(k);

    setKnownIds(p?.knownIds ?? []);
    setReviewIds(p?.reviewIds ?? []);
    setUpdatedAt(p?.updatedAt ?? null);
  };

  useEffect(() => {
    refresh();
    const off1 = onMaterialUpdated(refresh);
    const off2 = onProgressUpdated(refresh);
    return () => {
      off1?.();
      off2?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = cards.length;
  const known = knownIds.length;
  const review = reviewIds.length;

  const masteredPct = total ? pct((known / total) * 100) : 0;

  const remaining = Math.max(0, total - known - review);

  const byDifficulty = useMemo(() => {
    const diffs: Array<"easy" | "medium" | "hard"> = ["easy", "medium", "hard"];
    return diffs.map((d) => {
      const group = cards.filter((c) => c.difficulty === d);
      const totalD = group.length;
      const knownD = group.filter((c) => knownIds.includes(c.id)).length;
      const reviewD = group.filter((c) => reviewIds.includes(c.id)).length;
      const pctD = totalD ? pct((knownD / totalD) * 100) : 0;
      return { d, totalD, knownD, reviewD, pctD };
    });
  }, [cards, knownIds, reviewIds]);

  if (!total) {
    return (
      <section className="w-full max-w-5xl mx-auto mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <h2 className="text-2xl font-semibold">Progresso</h2>
        <p className="mt-2 opacity-70">Faça upload e gere flashcards para acompanhar seu progresso.</p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-5xl mx-auto mt-10">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm opacity-80">
          📊 Progresso
        </div>
        <h2 className="text-3xl font-semibold mt-4">Acompanhe seu Progresso</h2>
        {topic ? <p className="mt-2 opacity-70">{topic}</p> : null}
      </div>

      {/* Barra principal */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="text-sm opacity-70">Dominado</div>
            <div className="text-3xl font-semibold">{masteredPct}%</div>
          </div>

          <div className="text-sm opacity-70">
            {updatedAt ? `Atualizado: ${new Date(updatedAt).toLocaleString()}` : ""}
          </div>
        </div>

        <div className="mt-5 h-3 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-green-500/40 rounded-full" style={{ width: `${masteredPct}%` }} />
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
            <div className="text-sm opacity-70">Conhecidos</div>
            <div className="text-2xl font-semibold">{known}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
            <div className="text-sm opacity-70">Para revisar</div>
            <div className="text-2xl font-semibold">{review}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
            <div className="text-sm opacity-70">Não vistos</div>
            <div className="text-2xl font-semibold">{remaining}</div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => clearProgress(key)}
            className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm"
          >
            Resetar progresso
          </button>
        </div>
      </div>

      {/* Por dificuldade */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {byDifficulty.map((x) => (
          <div key={x.d} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{labelDifficulty(x.d)}</div>
              <div className="text-sm opacity-70">{x.pctD}%</div>
            </div>

            <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className={[
                  "h-full rounded-full",
                  x.d === "easy" ? "bg-green-500/40" : x.d === "hard" ? "bg-red-500/40" : "bg-yellow-500/40",
                ].join(" ")}
                style={{ width: `${x.pctD}%` }}
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-white/10 bg-black/10 p-3">
                <div className="text-xs opacity-70">Total</div>
                <div className="text-lg font-semibold">{x.totalD}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/10 p-3">
                <div className="text-xs opacity-70">Conhecidos</div>
                <div className="text-lg font-semibold">{x.knownD}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/10 p-3">
                <div className="text-xs opacity-70">Revisar</div>
                <div className="text-lg font-semibold">{x.reviewD}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
