"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Flashcard, loadMaterial, onMaterialUpdated } from "@/lib/studyMaterialStore";
import { makeProgressKey, loadProgress, saveProgress } from "@/lib/studyProgressStore";

type Filter = "smart" | "all" | "review" | "known";

function difficultyLabel(d: string) {
  if (d === "easy") return "Fácil";
  if (d === "hard") return "Difícil";
  return "Médio";
}

function difficultyClass(d: string) {
  if (d === "easy") return "border-green-500/30 bg-green-500/10 text-green-200";
  if (d === "hard") return "border-red-500/30 bg-red-500/10 text-red-200";
  return "border-yellow-500/30 bg-yellow-500/10 text-yellow-200";
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function uniqById(list: Flashcard[]) {
  const seen = new Set<number>();
  const out: Flashcard[] = [];
  for (const c of list) {
    if (!seen.has(c.id)) {
      seen.add(c.id);
      out.push(c);
    }
  }
  return out;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], seed: number) {
  const a = [...arr];
  const rand = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const STREAK_KEY = "studai:streak:v1";
type StreakState = { streak: number; lastDate: string };

function toYYYYMMDD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(dateStr: string, days: number) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, (m || 1) - 1, d || 1);
  dt.setDate(dt.getDate() + days);
  return toYYYYMMDD(dt);
}

function loadStreak(): StreakState {
  if (typeof window === "undefined") return { streak: 0, lastDate: "" };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { streak: 0, lastDate: "" };
    const parsed = JSON.parse(raw);
    return {
      streak: Number.isFinite(parsed?.streak) ? Number(parsed.streak) : 0,
      lastDate: typeof parsed?.lastDate === "string" ? parsed.lastDate : "",
    };
  } catch {
    return { streak: 0, lastDate: "" };
  }
}

function saveStreak(s: StreakState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STREAK_KEY, JSON.stringify(s));
}

function updateStreakOnStudy(): StreakState {
  const today = toYYYYMMDD(new Date());
  const current = loadStreak();

  if (!current.lastDate) {
    const next = { streak: 1, lastDate: today };
    saveStreak(next);
    return next;
  }

  if (current.lastDate === today) return current;

  const expected = addDays(current.lastDate, 1);
  const next =
    expected === today
      ? { streak: Math.max(1, current.streak + 1), lastDate: today }
      : { streak: 1, lastDate: today };

  saveStreak(next);
  return next;
}

function fireConfetti() {
  if (typeof window === "undefined") return;

  const root = document.createElement("div");
  root.style.position = "fixed";
  root.style.inset = "0";
  root.style.pointerEvents = "none";
  root.style.zIndex = "9999";
  document.body.appendChild(root);

  const pieces = 120;
  const w = window.innerWidth;
  const h = window.innerHeight;

  for (let i = 0; i < pieces; i++) {
    const p = document.createElement("div");
    const size = 6 + Math.random() * 8;

    p.style.position = "absolute";
    p.style.width = `${size}px`;
    p.style.height = `${size * 0.6}px`;
    p.style.borderRadius = "999px";
    p.style.left = `${Math.random() * w}px`;
    p.style.top = `${-20 - Math.random() * 200}px`;
    p.style.opacity = "0.95";
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    p.style.background = `hsl(${Math.floor(Math.random() * 360)}, 90%, 60%)`;

    const duration = 900 + Math.random() * 900;
    const drift = (Math.random() - 0.5) * 260;
    const rot = (Math.random() - 0.5) * 720;

    p.animate(
      [
        { transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${drift}px, ${h + 200}px) rotate(${rot}deg)`, opacity: 0.9 },
      ],
      { duration, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
    );

    root.appendChild(p);
  }

  setTimeout(() => root.remove(), 2200);
}

function haptic(pattern: number | number[]) {
  try {
    // @ts-ignore
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(pattern);
  } catch {}
}

async function requestFullscreen() {
  try {
    if (typeof document === "undefined") return;
    const el: any = document.documentElement;
    if (el?.requestFullscreen) await el.requestFullscreen();
  } catch {}
}

async function exitFullscreen() {
  try {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
  } catch {}
}

export default function FlashcardsSection({ data }: { data?: any }) {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [topic, setTopic] = useState<string>("");
  const [topicTags, setTopicTags] = useState<string[]>([]);

  const [idx, setIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [knownIds, setKnownIds] = useState<number[]>([]);
  const [reviewIds, setReviewIds] = useState<number[]>([]);
  const [filter, setFilter] = useState<Filter>("smart");

  const [direction, setDirection] = useState<1 | -1>(1);
  const [animKey, setAnimKey] = useState(0);

  const [streak, setStreak] = useState<StreakState>({ streak: 0, lastDate: "" });

  const confettiFiredRef = useRef(false);

  const [studyMode, setStudyMode] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [autoAdvanceDelayMs, setAutoAdvanceDelayMs] = useState(220);

  const [smartIncludeKnown, setSmartIncludeKnown] = useState(true);
  const [smartEvery, setSmartEvery] = useState(3);

  const [smartShuffle, setSmartShuffle] = useState(true);
  const [smartSeed, setSmartSeed] = useState(() => Date.now());

  const [smartSprintReviewOnly, setSmartSprintReviewOnly] = useState(false);

  const [lastAction, setLastAction] = useState<"known" | "review" | null>(null);

  // ✅ carrega do store (fallback)
  useEffect(() => {
    const refresh = () => {
      const m = loadMaterial();
      const newCards = m?.flashcards ?? [];
      const newTopic = m?.topic ?? "";
      const newTags = m?.tags ?? [];

      setCards(newCards);
      setTopic(newTopic);
      setTopicTags(newTags);

      setIdx(0);
      setShowAnswer(false);
      setFilter("smart");
      setDirection(1);
      setAnimKey((k) => k + 1);

      const key = makeProgressKey(newTopic, newCards.length);
      const p = loadProgress(key);
      setKnownIds(p?.knownIds ?? []);
      setReviewIds(p?.reviewIds ?? []);

      confettiFiredRef.current = false;
      setStreak(loadStreak());
      setLastAction(null);

      setSmartSeed(Date.now());
    };

    refresh();
    return onMaterialUpdated(refresh);
  }, []);

  // ✅ se vier data pelo page.tsx, usa ela também (não quebra nada)
  useEffect(() => {
    if (!data?.flashcards?.length) return;

    setCards(data.flashcards);
    setTopic(data.topic ?? "");
    setTopicTags(data.tags ?? []);

    setIdx(0);
    setShowAnswer(false);
    setFilter("smart");
    setDirection(1);
    setAnimKey((k) => k + 1);

    const key = makeProgressKey(data.topic ?? "", data.flashcards.length);
    const p = loadProgress(key);
    setKnownIds(p?.knownIds ?? []);
    setReviewIds(p?.reviewIds ?? []);

    confettiFiredRef.current = false;
    setStreak(loadStreak());
    setLastAction(null);

    setSmartSeed(Date.now());
  }, [data]);

  useEffect(() => {
    if (!lastAction) return;
    const t = window.setTimeout(() => setLastAction(null), 320);
    return () => window.clearTimeout(t);
  }, [lastAction]);

  const progressKey = useMemo(() => makeProgressKey(topic, cards.length), [topic, cards.length]);

  const smartDeck = useMemo(() => {
    if (!cards.length) return [];

    const knownSet = new Set(knownIds);
    const reviewSet = new Set(reviewIds);

    const reviewCardsRaw = cards.filter((c) => reviewSet.has(c.id));
    const unseenRaw = cards.filter((c) => !knownSet.has(c.id) && !reviewSet.has(c.id));
    const knownRaw = cards.filter((c) => knownSet.has(c.id));

    if (smartSprintReviewOnly) {
      const base = smartShuffle ? seededShuffle(reviewCardsRaw, smartSeed) : reviewCardsRaw;
      return uniqById(base);
    }

    const reviewCards = smartShuffle ? seededShuffle(reviewCardsRaw, smartSeed ^ 0xabc123) : reviewCardsRaw;
    const unseenCards = smartShuffle ? seededShuffle(unseenRaw, smartSeed ^ 0x55aa77) : unseenRaw;
    const knownCards = smartShuffle ? seededShuffle(knownRaw, smartSeed ^ 0x0f0f0f) : knownRaw;

    const priority = [...reviewCards, ...unseenCards];

    if (!smartIncludeKnown || knownCards.length === 0) {
      return uniqById(priority.length ? priority : cards);
    }

    const every = clamp(smartEvery, 1, 10);
    const deck: Flashcard[] = [];
    let i = 0;
    let j = 0;

    while (i < priority.length || j < knownCards.length) {
      for (let k = 0; k < every && i < priority.length; k++) deck.push(priority[i++]);
      if (j < knownCards.length) deck.push(knownCards[j++]);
      if (i >= priority.length && j < knownCards.length) while (j < knownCards.length) deck.push(knownCards[j++]);
    }

    return uniqById(deck.length ? deck : cards);
  }, [cards, knownIds, reviewIds, smartIncludeKnown, smartEvery, smartShuffle, smartSeed, smartSprintReviewOnly]);

  const filteredCards = useMemo(() => {
    if (filter === "smart") return smartDeck;
    if (filter === "known") return cards.filter((c) => knownIds.includes(c.id));
    if (filter === "review") return cards.filter((c) => reviewIds.includes(c.id));
    return cards;
  }, [cards, filter, knownIds, reviewIds, smartDeck]);

  // ✅ SAFE INDEX (não deixa current virar undefined)
  const safeIdx = useMemo(() => {
    if (!filteredCards.length) return 0;
    return Math.min(idx, filteredCards.length - 1);
  }, [idx, filteredCards.length]);

  const current = filteredCards[safeIdx];

  const deckProgressPct = useMemo(() => {
    const total = filteredCards.length || 1;
    const pos = Math.min(safeIdx + 1, total);
    return Math.round((pos / total) * 100);
  }, [safeIdx, filteredCards.length]);

  const masteredPct = useMemo(() => {
    const total = cards.length || 1;
    return Math.round((knownIds.length / total) * 100);
  }, [cards.length, knownIds.length]);

  function setIndexSafe(nextIndex: number, dir: 1 | -1) {
    setDirection(dir);
    setShowAnswer(false);
    setIdx(clamp(nextIndex, 0, Math.max(0, filteredCards.length - 1)));
    setAnimKey((k) => k + 1);
  }

  function next() {
    setIndexSafe(safeIdx + 1, 1);
  }
  function prev() {
    setIndexSafe(safeIdx - 1, -1);
  }

  function applyProgress(newKnown: number[], newReview: number[]) {
    setKnownIds(newKnown);
    setReviewIds(newReview);
    saveProgress(progressKey, { knownIds: newKnown, reviewIds: newReview });

    const s = updateStreakOnStudy();
    setStreak(s);

    const total = cards.length;
    if (total > 0 && newKnown.length >= total && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      fireConfetti();
      haptic([30, 40, 30]);
    }
  }

  async function enterStudyMode() {
    setStudyMode(true);
    await requestFullscreen();
  }
  async function leaveStudyMode() {
    setStudyMode(false);
    await exitFullscreen();
  }

  function scheduleAdvance() {
    if (!autoAdvance) return;
    const wait = clamp(autoAdvanceDelayMs, 0, 2000);
    window.setTimeout(() => next(), wait);
  }

  function markKnown() {
    if (!current) return;
    const id = current.id;

    const newKnown = knownIds.includes(id) ? knownIds : [...knownIds, id];
    const newReview = reviewIds.filter((x) => x !== id);

    setLastAction("known");
    haptic(20);
    applyProgress(newKnown, newReview);
    scheduleAdvance();
  }

  function markReview() {
    if (!current) return;
    const id = current.id;

    const newReview = reviewIds.includes(id) ? reviewIds : [...reviewIds, id];
    const newKnown = knownIds.filter((x) => x !== id);

    setLastAction("review");
    haptic([30, 20, 30]);
    applyProgress(newKnown, newReview);
    scheduleAdvance();
  }

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const el = document.activeElement as HTMLElement | null;
      const tag = el?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      if (e.key === "Escape") {
        if (studyMode) {
          e.preventDefault();
          leaveStudyMode();
        }
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        setShowAnswer((v) => !v);
      } else if (e.key.toLowerCase() === "a") {
        e.preventDefault();
        markReview();
      } else if (e.key.toLowerCase() === "d") {
        e.preventDefault();
        markKnown();
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        studyMode ? leaveStudyMode() : enterStudyMode();
      } else if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        setSmartSeed(Date.now());
      }
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeIdx, current, filteredCards.length, knownIds, reviewIds, studyMode, autoAdvance, autoAdvanceDelayMs]);

  useEffect(() => {
    if (idx !== safeIdx) setIdx(safeIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeIdx]);

  if (!cards.length) {
    return (
      <section className="w-full max-w-5xl mx-auto mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <h2 className="text-2xl font-semibold">FlashCards</h2>
        <p className="mt-2 opacity-70">Faça um upload para gerar flashcards automaticamente.</p>
      </section>
    );
  }

  const animClass = direction === 1 ? "studai-enter-right" : "studai-enter-left";
  const curDifficulty = (current?.difficulty as string) || "medium";

  function FlashcardCard({ compact }: { compact?: boolean }) {
    if (!current) return null;

    return (
      <div className={compact ? "" : "mt-5"} style={{ perspective: "1200px" }}>
        <div key={`${animKey}-${current.id}`} className={animClass}>
          <button type="button" onClick={() => setShowAnswer((v) => !v)} className="w-full text-left">
            <div
              className={[
                "relative w-full rounded-2xl border border-white/10 bg-black/10",
                lastAction === "known" ? "ring-1 ring-[#00FF8B]/40" : "",
                lastAction === "review" ? "ring-1 ring-red-500/40" : "",
              ].join(" ")}
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 600ms cubic-bezier(.2,.8,.2,1)",
                transform: showAnswer ? "rotateY(180deg)" : "rotateY(0deg)",
                minHeight: compact ? "320px" : "260px",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl p-8 md:p-10 flex flex-col justify-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="text-sm opacity-70 mb-3">Pergunta</div>
                <div className="text-xl md:text-2xl font-semibold leading-relaxed">{current.question}</div>
                <div className="mt-4 text-sm opacity-60">
                  (clique/ Espaço) • ← → • A = Não sei • D = Sei • F = Tela cheia • R = Shuffle
                </div>
              </div>

              <div
                className="absolute inset-0 rounded-2xl p-8 md:p-10 flex flex-col justify-center"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="text-sm opacity-70 mb-3">Resposta</div>
                <div className="text-xl md:text-2xl font-semibold leading-relaxed">{current.answer}</div>
                <div className="mt-4 text-sm opacity-60">(clique/ Espaço) • ESC = Sair</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  function ControlsRow() {
    return (
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <button
          className="w-full md:w-auto px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
          onClick={prev}
        >
          Anterior
        </button>

        <div className="flex w-full md:w-auto gap-3">
          <button
            className="flex-1 md:flex-none px-5 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 text-red-200 font-semibold"
            onClick={markReview}
          >
            Não sei (A)
          </button>

          <button
            className="flex-1 md:flex-none px-5 py-2 rounded-xl border border-[#00FF8B]/30 bg-[#00FF8B]/10 hover:bg-[#00FF8B]/15 text-[#00FF8B] font-semibold"
            onClick={markKnown}
          >
            Sei (D)
          </button>
        </div>

        <button
          className="w-full md:w-auto px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
          onClick={next}
        >
          Próximo
        </button>
      </div>
    );
  }

  return (
    <section className="w-full max-w-5xl mx-auto mt-10">
      <style>{`
        @keyframes studaiEnterRight {
          0% { opacity: 0; transform: translateX(18px) scale(.995); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes studaiEnterLeft {
          0% { opacity: 0; transform: translateX(-18px) scale(.995); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .studai-enter-right { animation: studaiEnterRight 260ms ease-out; }
        .studai-enter-left { animation: studaiEnterLeft 260ms ease-out; }
      `}</style>

      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm opacity-80">
          🎯 Flashcards gerados
        </div>

        <h2 className="text-3xl font-semibold mt-4">FlashCards</h2>
        {topic ? <p className="mt-2 opacity-70">{topic}</p> : null}

        <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF8B]/20 bg-[#00FF8B]/10 text-sm">
            🔥 Sequência: <span className="font-semibold">{Math.max(0, streak.streak)}</span> dia(s)
          </span>

          <button
            onClick={() => (studyMode ? leaveStudyMode() : enterStudyMode())}
            className="px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm"
          >
            {studyMode ? "Sair do Study Mode (ESC)" : "Study Mode (F)"}
          </button>
        </div>

        {topicTags?.length ? (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {topicTags.slice(0, 10).map((t) => (
              <span key={t} className="text-xs px-3 py-1 rounded-full border border-white/10 bg-black/10 opacity-80">
                #{t}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-4 max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs opacity-70">
            <span>Domínio (deck completo)</span>
            <span>{masteredPct}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-[#00FF8B]/40" style={{ width: `${masteredPct}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm opacity-70">Total</div>
          <div className="text-2xl font-semibold">{cards.length}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm opacity-70">Conhecidos</div>
          <div className="text-2xl font-semibold">{knownIds.length}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm opacity-70">Para revisar</div>
          <div className="text-2xl font-semibold">{reviewIds.length}</div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-semibold">Auto-advance</div>
              <div className="text-sm opacity-70">Depois de marcar (A/D), vai para o próximo automaticamente.</div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setAutoAdvance((v) => !v)}
                className={[
                  "px-4 py-2 rounded-xl border text-sm",
                  autoAdvance
                    ? "border-[#00FF8B]/30 bg-[#00FF8B]/10 text-[#00FF8B]"
                    : "border-white/10 bg-black/10 opacity-80 hover:bg-black/20",
                ].join(" ")}
              >
                {autoAdvance ? "Auto-advance: ON" : "Auto-advance: OFF"}
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs opacity-70">Delay</span>
                <input
                  type="number"
                  min={0}
                  max={2000}
                  value={autoAdvanceDelayMs}
                  onChange={(e) => setAutoAdvanceDelayMs(clamp(Number(e.target.value || 0), 0, 2000))}
                  className="w-24 rounded-lg border border-white/10 bg-black/20 px-3 py-2 outline-none text-sm"
                />
                <span className="text-xs opacity-70">ms</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-semibold">Revisão inteligente</div>
              <div className="text-sm opacity-70">Prioriza “Não sei” + “não vistos” e intercala “Sei” pra reforço espaçado.</div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm opacity-90">
                <input
                  type="checkbox"
                  checked={smartIncludeKnown}
                  onChange={(e) => setSmartIncludeKnown(e.target.checked)}
                  disabled={smartSprintReviewOnly}
                />
                Misturar conhecidos
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs opacity-70">1 conhecido a cada</span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={smartEvery}
                  onChange={(e) => setSmartEvery(clamp(Number(e.target.value || 3), 1, 10))}
                  className="w-20 rounded-lg border border-white/10 bg-black/20 px-3 py-2 outline-none text-sm"
                  disabled={smartSprintReviewOnly}
                />
                <span className="text-xs opacity-70">prioritários</span>
              </div>

              <label className="flex items-center gap-2 text-sm opacity-90">
                <input type="checkbox" checked={smartShuffle} onChange={(e) => setSmartShuffle(e.target.checked)} />
                Shuffle leve
              </label>

              <button
                onClick={() => setSmartSeed(Date.now())}
                className="px-4 py-2 rounded-xl border border-white/10 bg-black/10 hover:bg-black/20 text-sm"
              >
                Re-embaralhar (R)
              </button>

              <label className="flex items-center gap-2 text-sm opacity-90">
                <input
                  type="checkbox"
                  checked={smartSprintReviewOnly}
                  onChange={(e) => {
                    setSmartSprintReviewOnly(e.target.checked);
                    setFilter("smart");
                    setIdx(0);
                    setShowAnswer(false);
                    setAnimKey((k) => k + 1);
                  }}
                />
                Sprint “Só Não-sei”
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
        {(["smart", "all", "review", "known"] as const).map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setDirection(1);
              setIdx(0);
              setShowAnswer(false);
              setAnimKey((k) => k + 1);
              setLastAction(null);
            }}
            className={[
              "px-4 py-2 rounded-xl border text-sm",
              "border-white/10 bg-white/5 hover:bg-white/10",
              filter === f ? "ring-1 ring-white/20" : "",
            ].join(" ")}
          >
            {f === "smart" ? (smartSprintReviewOnly ? "Sprint" : "Inteligente") : f === "all" ? "Todos" : f === "review" ? "Revisar" : "Conhecidos"}
          </button>
        ))}
      </div>

      {!filteredCards.length || !current ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center opacity-70">
          {smartSprintReviewOnly ? "Sprint concluído 🎉 Você não tem mais cards marcados como “Não sei”." : "Nada aqui ainda para este filtro."}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm opacity-70">
              {safeIdx + 1} de {filteredCards.length}
            </div>

            <span className={["text-xs px-3 py-1 rounded-full border", difficultyClass(curDifficulty)].join(" ")}>
              {difficultyLabel(curDifficulty)}
            </span>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs opacity-70">
              <span>Progresso (deck atual)</span>
              <span>{deckProgressPct}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-[#00FF8B]/50" style={{ width: `${deckProgressPct}%` }} />
            </div>
          </div>

          <FlashcardCard />
          <ControlsRow />
        </div>
      )}

      {studyMode ? (
        <div className="fixed inset-0 z-[9998]">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={leaveStudyMode} />
          <div className="relative z-[9999] h-full w-full p-4 md:p-10 flex items-center justify-center">
            <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0D0D0D] p-6 md:p-8">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="text-sm opacity-70">Study Mode</div>
                  <div className="font-semibold text-lg">{topic || "Flashcards"}</div>
                  <div className="text-xs opacity-60 mt-1">ESC para sair • clique fora para fechar</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAutoAdvance((v) => !v)}
                    className={[
                      "px-3 py-2 rounded-xl border text-sm",
                      autoAdvance
                        ? "border-[#00FF8B]/30 bg-[#00FF8B]/10 text-[#00FF8B]"
                        : "border-white/10 bg-white/5 hover:bg-white/10 opacity-90",
                    ].join(" ")}
                  >
                    {autoAdvance ? "Auto: ON" : "Auto: OFF"}
                  </button>

                  <button
                    onClick={leaveStudyMode}
                    className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm"
                  >
                    Sair (ESC)
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs opacity-70">
                  <span>
                    {safeIdx + 1} de {filteredCards.length} • {filter === "smart" ? (smartSprintReviewOnly ? "Sprint" : "Inteligente") : filter}
                  </span>
                  <span>{deckProgressPct}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-[#00FF8B]/50" style={{ width: `${deckProgressPct}%` }} />
                </div>
              </div>

              <div className="mt-5">
                <FlashcardCard compact />
                <ControlsRow />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
