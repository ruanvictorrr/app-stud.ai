"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import {
  Flashcard,
  loadMaterial,
  onMaterialUpdated,
} from "@/lib/studyMaterialStore";
import {
  loadProgress,
  saveProgress,
  makeProgressKey,
  makeProgressKeyForDoc,
  clearProgress,
} from "@/lib/studyProgressStore";
import {
  startSession,
  recordSessionAction,
  endSession,
} from "@/lib/studySessionStore";
import {
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  StopCircle,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

type Filter = "all" | "review" | "known";
type Mode = "deck" | "session";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}
function pct(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}
function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashcardsSection(_props: { data?: any }) {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [docId, setDocId] = useState<string>("");

  const [filter, setFilter] = useState<Filter>("all");
  const [mode, setMode] = useState<Mode>("deck");

  const [isFlipped, setIsFlipped] = useState(false);
  const [index, setIndex] = useState(0);

  const [knownIds, setKnownIds] = useState<number[]>([]);
  const [reviewIds, setReviewIds] = useState<number[]>([]);

  const [sessionSize, setSessionSize] = useState<number>(10);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionQueue, setSessionQueue] = useState<Flashcard[]>([]);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // ---------- Progress keys (doc + legacy) ----------
  const legacyKey = useMemo(() => makeProgressKey(topic || "deck", cards.length || 0), [topic, cards.length]);
  const docKey = useMemo(() => (docId ? makeProgressKeyForDoc(docId) : ""), [docId]);

  // ---------- Load material + progress ----------
  useEffect(() => {
    const refresh = () => {
      const m = loadMaterial();
      setTopic(m?.topic ?? "");
      setCards(m?.flashcards ?? []);
      setDocId(m?.docId ?? "");

      // carrega progresso: primeiro por docId, depois fallback legacy
      const pDoc = m?.docId ? loadProgress(makeProgressKeyForDoc(m.docId)) : null;
      const pLegacy = loadProgress(makeProgressKey(m?.topic ?? "deck", m?.flashcards?.length ?? 0));

      const p = pDoc ?? pLegacy;

      setKnownIds(p?.knownIds ?? []);
      setReviewIds(p?.reviewIds ?? []);

      setFilter("all");
      setMode("deck");
      setIndex(0);
      setIsFlipped(false);

      setSessionActive(false);
      setSessionQueue([]);
      setSessionIndex(0);
      setSessionId(null);
    };

    refresh();
    return onMaterialUpdated(refresh);
  }, []);

  const knownSet = useMemo(() => new Set(knownIds), [knownIds]);
  const reviewSet = useMemo(() => new Set(reviewIds), [reviewIds]);

  // ---------- Filtered deck (deck mode) ----------
  const filteredCards = useMemo(() => {
    if (filter === "known") return cards.filter((c) => knownSet.has(c.id));
    if (filter === "review") return cards.filter((c) => reviewSet.has(c.id));
    return cards;
  }, [cards, filter, knownSet, reviewSet]);

  // ---------- Active list (deck or session) ----------
  const activeList = sessionActive ? sessionQueue : filteredCards;
  const activeIndex = sessionActive ? sessionIndex : index;
  const current = activeList[activeIndex] ?? null;

  // ---------- Overall progress ----------
  const doneCount = useMemo(() => {
    const s = new Set<number>([...knownIds, ...reviewIds]);
    return s.size;
  }, [knownIds, reviewIds]);

  const progressPct = useMemo(() => {
    const total = cards.length || 0;
    return total ? pct((doneCount / total) * 100) : 0;
  }, [doneCount, cards.length]);

  const accuracyPct = useMemo(() => {
    const k = knownIds.length;
    const r = reviewIds.length;
    return (k + r) ? pct((k / (k + r)) * 100) : 0;
  }, [knownIds.length, reviewIds.length]);

  // ---------- Save progress (doc + legacy) ----------
  const persistProgress = useCallback(
    (nextKnown: number[], nextReview: number[]) => {
      const payload = {
        knownIds: nextKnown,
        reviewIds: nextReview,
        updatedAt: new Date().toISOString(),
      };

      // salva por docId (novo)
      if (docKey) saveProgress(docKey, payload);

      // salva também no legacy para compatibilidade com telas antigas
      if (legacyKey) saveProgress(legacyKey, payload);
    },
    [docKey, legacyKey]
  );

  // ---------- Helpers ----------
  function safeSetDeckIndex(next: number) {
    const total = filteredCards.length;
    if (!total) return setIndex(0);
    const clamped = Math.max(0, Math.min(total - 1, next));
    setIndex(clamped);
  }

  function safeSetSessionIndex(next: number) {
    const total = sessionQueue.length;
    if (!total) return setSessionIndex(0);
    const clamped = Math.max(0, Math.min(total - 1, next));
    setSessionIndex(clamped);
  }

  function goNext() {
    setIsFlipped(false);
    if (sessionActive) safeSetSessionIndex(sessionIndex + 1);
    else safeSetDeckIndex(index + 1);
  }

  function goPrev() {
    setIsFlipped(false);
    if (sessionActive) safeSetSessionIndex(sessionIndex - 1);
    else safeSetDeckIndex(index - 1);
  }

  // ---------- Session build ----------
  function buildSessionDeck(size: number) {
    const total = cards.length;
    const want = Math.max(1, Math.min(total || 1, Math.trunc(size || 10)));

    // prioridade: não respondidos -> review -> resto
    const notDone = cards.filter((c) => !knownSet.has(c.id) && !reviewSet.has(c.id));
    const review = cards.filter((c) => reviewSet.has(c.id));
    const rest = cards.filter((c) => knownSet.has(c.id));

    const pool = [...shuffle(notDone), ...shuffle(review), ...shuffle(rest)];
    return pool.slice(0, want);
  }

  function startNewSession() {
    if (!cards.length || !docId) return;

    const deck = buildSessionDeck(sessionSize);
    setMode("session");
    setSessionQueue(deck);
    setSessionIndex(0);
    setIsFlipped(false);
    setSessionActive(true);

    const sid = startSession({
      docId,
      mode: "session",
      sessionSize: deck.length,
    });
    setSessionId(sid);
  }

  function stopSession() {
    if (sessionId) endSession(sessionId);
    setSessionActive(false);
    setSessionQueue([]);
    setSessionIndex(0);
    setSessionId(null);
    setIsFlipped(false);
    setMode("deck");
  }

  // ---------- Mark actions ----------
  const markKnown = useCallback(() => {
    if (!current) return;

    const nextKnownSet = new Set(knownIds);
    const nextReviewSet = new Set(reviewIds);

    nextKnownSet.add(current.id);
    nextReviewSet.delete(current.id);

    const nextKnown = Array.from(nextKnownSet);
    const nextReview = Array.from(nextReviewSet);

    setKnownIds(nextKnown);
    setReviewIds(nextReview);
    persistProgress(nextKnown, nextReview);

    if (sessionActive && sessionId) recordSessionAction(sessionId, "known");

    // fim de sessão?
    if (sessionActive && sessionQueue.length && sessionIndex >= sessionQueue.length - 1) {
      if (sessionId) endSession(sessionId);
      stopSession();
      return;
    }

    goNext();
  }, [
    current,
    knownIds,
    reviewIds,
    persistProgress,
    sessionActive,
    sessionId,
    sessionQueue.length,
    sessionIndex,
  ]);

  const markReview = useCallback(() => {
    if (!current) return;

    const nextKnownSet = new Set(knownIds);
    const nextReviewSet = new Set(reviewIds);

    nextReviewSet.add(current.id);
    nextKnownSet.delete(current.id);

    const nextKnown = Array.from(nextKnownSet);
    const nextReview = Array.from(nextReviewSet);

    setKnownIds(nextKnown);
    setReviewIds(nextReview);
    persistProgress(nextKnown, nextReview);

    if (sessionActive && sessionId) recordSessionAction(sessionId, "review");

    if (sessionActive && sessionQueue.length && sessionIndex >= sessionQueue.length - 1) {
      if (sessionId) endSession(sessionId);
      stopSession();
      return;
    }

    goNext();
  }, [
    current,
    knownIds,
    reviewIds,
    persistProgress,
    sessionActive,
    sessionId,
    sessionQueue.length,
    sessionIndex,
  ]);

  // ---------- Keyboard shortcuts ----------
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!current) return;

      if (e.key === " " || e.key.toLowerCase() === "enter") {
        e.preventDefault();
        setIsFlipped((v) => !v);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        markReview();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        markKnown();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, markKnown, markReview]);

  // ---------- Empty state ----------
  if (!cards.length) {
    return (
      <section className="w-full max-w-5xl mx-auto mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <h2 className="text-2xl font-semibold">Flashcards</h2>
        <p className="mt-2 opacity-70">Faça um upload para gerar flashcards automaticamente.</p>
      </section>
    );
  }

  // ---------- If filter results empty ----------
  const hasActive = !!current;

  return (
    <section className="w-full max-w-5xl mx-auto mt-10">
      {/* Header premium */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="text-xs opacity-70">Flashcards</div>
            <h2 className="text-2xl font-semibold mt-1">{topic || "Seu deck"}</h2>
            <div className="mt-2 text-sm opacity-70">
              Atalhos: <b>Enter/Espaço</b> vira • <b>←</b> revisar • <b>→</b> acertei
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Chip tone="neutral" label={`📚 Cards: ${cards.length}`} />
            <Chip tone="neutral" label={`✅ Feitos: ${doneCount}`} />
            <Chip tone="green" label={`🎯 Aproveitamento: ${accuracyPct}%`} />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs opacity-70">
            <span>Progresso geral</span>
            <span>{progressPct}%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-black/30 overflow-hidden border border-white/10">
            <div className="h-full rounded-full bg-[#00FF8B]/70" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        {/* Controls row */}
        <div className="mt-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 text-xs opacity-70 mr-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filtro:
            </div>
            <Pill active={filter === "all"} onClick={() => { setFilter("all"); setIsFlipped(false); setIndex(0); }}>
              Todos
            </Pill>
            <Pill active={filter === "review"} onClick={() => { setFilter("review"); setIsFlipped(false); setIndex(0); }}>
              Revisar
            </Pill>
            <Pill active={filter === "known"} onClick={() => { setFilter("known"); setIsFlipped(false); setIndex(0); }}>
              Conhecidos
            </Pill>
          </div>

          {/* Session controls */}
          <div className="flex flex-wrap items-center gap-2">
            {!sessionActive ? (
              <>
                <div className="text-xs opacity-70 mr-1">Sessão:</div>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={sessionSize}
                  onChange={(e) => setSessionSize(Math.max(1, Math.min(50, Math.trunc(Number(e.target.value) || 10))))}
                  className="w-24 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none"
                />
                <button
                  onClick={startNewSession}
                  className="rounded-2xl border border-[#00FF8B]/30 bg-[#00FF8B]/10 px-4 py-2 text-sm font-semibold text-[#00FF8B] hover:bg-[#00FF8B]/15 inline-flex items-center gap-2"
                >
                  <Play className="w-4 h-4" /> Iniciar
                </button>
              </>
            ) : (
              <button
                onClick={stopSession}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm hover:bg-black/30 inline-flex items-center gap-2"
              >
                <StopCircle className="w-4 h-4" /> Encerrar sessão
              </button>
            )}

            <button
              onClick={() => {
                // reset só do deck ativo
                if (docKey) clearProgress(docKey);
                if (legacyKey) clearProgress(legacyKey);
                setKnownIds([]);
                setReviewIds([]);
                setIsFlipped(false);
              }}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset progresso
            </button>
          </div>
        </div>
      </div>

      {/* If filtered list empty */}
      {!hasActive ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
          <div className="text-xl font-semibold">Nada aqui ainda</div>
          <div className="mt-2 opacity-70">
            Esse filtro não tem cards. Tente “Todos” ou faça uma sessão.
          </div>
          <button
            onClick={() => setFilter("all")}
            className="mt-6 rounded-2xl border border-[#00FF8B]/30 bg-[#00FF8B]/10 px-6 py-3 font-semibold text-[#00FF8B] hover:bg-[#00FF8B]/15"
          >
            Voltar para Todos
          </button>
        </div>
      ) : (
        <>
          {/* Card index line */}
          <div className="mt-6 flex items-center justify-between text-sm opacity-80">
            <div>
              {sessionActive ? (
                <span>
                  Sessão • Card <b>{sessionIndex + 1}</b>/<b>{sessionQueue.length}</b>
                </span>
              ) : (
                <span>
                  Deck • Card <b>{index + 1}</b>/<b>{filteredCards.length}</b>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs opacity-70">
              <span className="inline-flex items-center gap-1">
                ✅ {knownIds.length}
              </span>
              <span className="inline-flex items-center gap-1">
                ❌ {reviewIds.length}
              </span>
            </div>
          </div>

          {/* Flip card */}
          <div className="mt-3 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="relative [perspective:1200px]">
              <div
                className={cn(
                  "relative w-full min-h-[260px] transition-transform duration-500 [transform-style:preserve-3d]",
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                )}
              >
                {/* FRONT */}
                <button
                  type="button"
                  onClick={() => setIsFlipped(true)}
                  className="absolute inset-0 rounded-2xl border border-white/10 bg-black/20 p-6 text-left [backface-visibility:hidden] hover:bg-black/25"
                >
                  <div className="text-xs opacity-70">Pergunta</div>
                  <div className="mt-2 text-xl font-semibold leading-relaxed">
                    {current!.question}
                  </div>

                  <div className="mt-6 text-sm opacity-70">
                    Clique para ver a resposta
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {knownSet.has(current!.id) ? <Chip tone="green" label="✅ Conhecido" /> : null}
                    {reviewSet.has(current!.id) ? <Chip tone="red" label="❌ Revisar" /> : null}
                    {current!.difficulty ? <Chip tone="neutral" label={`⚡ ${current!.difficulty}`} /> : null}
                  </div>
                </button>

                {/* BACK */}
                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  className="absolute inset-0 rounded-2xl border border-white/10 bg-black/20 p-6 text-left [transform:rotateY(180deg)] [backface-visibility:hidden] hover:bg-black/25"
                >
                  <div className="text-xs opacity-70">Resposta</div>
                  <div className="mt-2 text-lg leading-relaxed whitespace-pre-wrap opacity-95">
                    {current!.answer}
                  </div>

                  <div className="mt-6 text-sm opacity-70">
                    Clique para voltar à pergunta
                  </div>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  disabled={activeIndex <= 0}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm hover:bg-white/10 disabled:opacity-40 inline-flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Anterior
                </button>

                <button
                  onClick={goNext}
                  disabled={activeIndex >= activeList.length - 1}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm hover:bg-white/10 disabled:opacity-40 inline-flex items-center gap-2"
                >
                  Próximo <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={markReview}
                  className="rounded-2xl border border-red-500/25 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200 hover:bg-red-500/15 inline-flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> Revisar
                </button>

                <button
                  onClick={markKnown}
                  className="rounded-2xl border border-[#00FF8B]/30 bg-[#00FF8B]/10 px-5 py-3 text-sm font-semibold text-[#00FF8B] hover:bg-[#00FF8B]/15 inline-flex items-center gap-2"
                >
                  <Check className="w-4 h-4" /> Acertei
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: any;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm border transition",
        active
          ? "border-[#00FF8B]/30 bg-[#00FF8B]/10 text-[#00FF8B]"
          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
      )}
    >
      {children}
    </button>
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
