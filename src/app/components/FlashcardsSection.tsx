"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import {
  loadProgress,
  saveProgress,
  makeProgressKey,
  onProgressUpdated,
} from "@/lib/studyProgressStore";

type Props = {
  data?: any | null;
};

type Material = {
  materialId?: string;
  topic?: string;
  flashcards?: Array<{ id: number; question: string; answer: string }>;
  summary?: any;
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

  // latest.data é o Json com topic/flashcards/summary
  const payload = latest?.data && typeof latest.data === "object" ? latest.data : null;
  if (!payload) return null;

  const material: Material = {
    ...payload,
    materialId: latest.id,
    topic: payload.topic || latest.topic || "Material",
  };

  // salva espelho no localStorage (ajuda quando navegar)
  try {
    localStorage.setItem("studai:lastMaterialData:v1", JSON.stringify(material));
  } catch {}

  return material;
}

async function fetchMeId(): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/me");
    const json = await res.json();
    if (!res.ok || !json?.success) return null;
    return json?.data?.id || null;
  } catch {
    return null;
  }
}

export default function FlashcardsSection({ data }: Props) {
  const [material, setMaterial] = useState<Material | null>(data || null);
  const [loading, setLoading] = useState<boolean>(!data);
  const [error, setError] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(null);

  const [index, setIndex] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [knownIds, setKnownIds] = useState<Set<number>>(new Set());
  const [reviewIds, setReviewIds] = useState<Set<number>>(new Set());

  // 1) pega userId (pra chave do progresso)
  useEffect(() => {
    fetchMeId().then(setUserId);
  }, []);

  // 2) se não veio data por prop, busca do DB
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

  const cards = useMemo(() => {
    const list = material?.flashcards || [];
    return Array.isArray(list) ? list : [];
  }, [material]);

  const materialId = material?.materialId || "latest";
  const progressKey = useMemo(() => {
    // se não tiver userId ainda, usa "me" pra não quebrar
    return makeProgressKey(userId || "me", materialId);
  }, [userId, materialId]);

  // 3) carrega progresso quando tiver cards
  useEffect(() => {
    if (!cards.length) return;

    const p = loadProgress(progressKey);
    if (p) {
      setIndex(Math.min(p.currentIndex || 0, Math.max(0, cards.length - 1)));
      setKnownIds(new Set(p.knownIds || []));
      setReviewIds(new Set(p.reviewIds || []));
    } else {
      setIndex(0);
      setKnownIds(new Set());
      setReviewIds(new Set());
    }

    // escuta atualizações do progresso
    const unsub = onProgressUpdated((key) => {
      if (key !== progressKey) return;
      const next = loadProgress(progressKey);
      if (!next) return;

      setIndex(Math.min(next.currentIndex || 0, Math.max(0, cards.length - 1)));
      setKnownIds(new Set(next.knownIds || []));
      setReviewIds(new Set(next.reviewIds || []));
    });

    return () => unsub();
  }, [cards.length, progressKey]);

  function persist(nextIndex: number, nextKnown: Set<number>, nextReview: Set<number>) {
    saveProgress(progressKey, {
      currentIndex: nextIndex,
      knownIds: Array.from(nextKnown),
      reviewIds: Array.from(nextReview),
      updatedAt: Date.now(),
    });
  }

  function prev() {
    const next = Math.max(0, index - 1);
    setIndex(next);
    setFlipped(false);
    persist(next, knownIds, reviewIds);
  }

  function next() {
    const next = Math.min(cards.length - 1, index + 1);
    setIndex(next);
    setFlipped(false);
    persist(next, knownIds, reviewIds);
  }

  function markKnown() {
    const id = cards[index]?.id;
    if (!id) return;

    const k = new Set(knownIds);
    const r = new Set(reviewIds);
    k.add(id);
    r.delete(id);

    setKnownIds(k);
    setReviewIds(r);

    const nextIndex = Math.min(cards.length - 1, index + 1);
    setIndex(nextIndex);
    setFlipped(false);

    persist(nextIndex, k, r);
  }

  function markReview() {
    const id = cards[index]?.id;
    if (!id) return;

    const k = new Set(knownIds);
    const r = new Set(reviewIds);
    r.add(id);
    k.delete(id);

    setKnownIds(k);
    setReviewIds(r);

    const nextIndex = Math.min(cards.length - 1, index + 1);
    setIndex(nextIndex);
    setFlipped(false);

    persist(nextIndex, k, r);
  }

  const total = cards.length;
  const done = knownIds.size + reviewIds.size;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  if (loading) {
    return (
      <section className="w-full">
        <div className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-6 text-gray-300">
          Carregando flashcards...
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

  if (!total) {
    return (
      <section className="w-full">
        <div className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-6 text-gray-300">
          Nenhum flashcard encontrado neste material.
        </div>
      </section>
    );
  }

  const card = cards[index];

  return (
    <section className="w-full">
      <div className="mb-5 flex flex-col gap-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-2xl font-bold text-white">FlashCards</div>
            <div className="text-sm text-gray-400">
              {material?.topic || "Material"} • {done}/{total} estudados
            </div>
          </div>

          <div className="text-sm text-gray-400">{pct}%</div>
        </div>

        {/* Barra de progresso */}
        <div className="h-2 w-full rounded-full bg-[#1A1A1A] overflow-hidden">
          <div
            className="h-full bg-[#00FF8B]"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Contadores */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-4">
            <div className="text-xs text-gray-400">Conhecidos</div>
            <div className="text-2xl font-semibold text-white">{knownIds.size}</div>
          </div>
          <div className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-4">
            <div className="text-xs text-gray-400">Para revisar</div>
            <div className="text-2xl font-semibold text-white">{reviewIds.size}</div>
          </div>
        </div>
      </div>

      {/* Card (flip) */}
      <div className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-5">
        <div className="mb-4 flex items-center justify-between text-sm text-gray-400">
          <span>
            Pergunta {index + 1}/{total}
          </span>
          <button
            onClick={() => setFlipped((v) => !v)}
            className="rounded-lg border border-[#1A1A1A] px-3 py-1 hover:bg-[#1A1A1A]"
          >
            {flipped ? "Ver pergunta" : "Ver resposta"}
          </button>
        </div>

        <div
          className="relative w-full"
          style={{ perspective: 1200 }}
        >
          <button
            type="button"
            onClick={() => setFlipped((v) => !v)}
            className="w-full text-left"
            aria-label="Virar flashcard"
          >
            <div
              className={cn(
                "relative w-full rounded-2xl border border-[#00FF8B]/25 bg-[#0D0D0D] p-6 transition-transform duration-500",
                "shadow-[0_0_0_1px_rgba(0,255,139,0.08)]",
              )}
              style={{
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                minHeight: 220,
              }}
            >
              {/* Frente */}
              <div
                className="absolute inset-0 p-6"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="text-xs text-[#00FF8B] font-semibold">PERGUNTA</div>
                <div className="mt-3 text-lg sm:text-xl font-semibold text-white">
                  {card?.question}
                </div>
                <div className="mt-6 text-sm text-gray-400">
                  Clique no card para virar.
                </div>
              </div>

              {/* Verso */}
              <div
                className="absolute inset-0 p-6"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="text-xs text-[#00FF8B] font-semibold">RESPOSTA</div>
                <div className="mt-3 text-base sm:text-lg text-gray-100 whitespace-pre-wrap">
                  {card?.answer}
                </div>
                <div className="mt-6 text-sm text-gray-400">
                  Clique no card para voltar.
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Ações */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={prev}
            disabled={index === 0}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#1A1A1A] px-4 py-2 text-sm text-gray-300 disabled:opacity-40 hover:bg-[#1A1A1A]"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          <div className="flex w-full sm:w-auto gap-2">
            <button
              onClick={markReview}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-red-600/15 border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-600/20"
            >
              <XCircle className="w-4 h-4" />
              Não sei
            </button>

            <button
              onClick={markKnown}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-[#00FF8B] px-4 py-2 text-sm font-semibold text-[#0D0D0D] hover:opacity-90"
            >
              <CheckCircle2 className="w-4 h-4" />
              Sei
            </button>
          </div>

          <button
            onClick={next}
            disabled={index >= total - 1}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#1A1A1A] px-4 py-2 text-sm text-gray-300 disabled:opacity-40 hover:bg-[#1A1A1A]"
          >
            Próximo
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
