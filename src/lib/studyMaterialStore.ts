export type FlashcardDifficulty = "easy" | "medium" | "hard";

export type Flashcard = {
  id: number;
  question: string;
  answer: string;
  difficulty?: FlashcardDifficulty;
  tags?: string[];
};

export type SourceQuote = {
  quote: string;
  whyItMatters: string;
};

export type SummaryLength = "short" | "medium" | "long";

export type SummaryTopic = {
  id: number;
  title: string;
  content: string;
  icon: string;
  tags?: string[];
};

export type StudySummary = {
  title: string;
  length?: SummaryLength;
  mainTopics: SummaryTopic[];
  keyPoints: string[];
  sourceQuotes?: SourceQuote[];
};

export type StudyMaterial = {
  docId?: string;                 // ✅ novo
  sourceFileName?: string;        // ✅ novo
  sourceMimeType?: string;        // ✅ novo

  topic: string;
  tags?: string[];
  flashcards: Flashcard[];
  summary: StudySummary;
  createdAt?: string;

  // preferências usadas na geração (opcional)
  prefs?: {
    flashcardsCount?: number;
    flashcardsDifficulty?: string;
    summaryStyle?: string;
  };
};

const KEY_LAST = "studai:lastMaterial:v1";
const KEY_LIBRARY = "studai:materials:v1";

const listeners = new Set<() => void>();
const libraryListeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) {
    try {
      fn();
    } catch {}
}
}
function emitLibrary() {
  for (const fn of libraryListeners) {
    try {
      fn();
    } catch {}
  }
}

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function uid() {
  // @ts-ignore
  return (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : `doc_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function normalizeFlashcards(input: any): Flashcard[] {
  const arr = Array.isArray(input) ? input : [];
  const out: Flashcard[] = [];

  for (let i = 0; i < arr.length; i++) {
    const c = arr[i] || {};
    const id = Number.isFinite(Number(c.id)) ? Number(c.id) : i + 1;

    const question = typeof c.question === "string" ? c.question : "";
    const answer = typeof c.answer === "string" ? c.answer : "";
    if (!question || !answer) continue;

    const d = String(c.difficulty || "").toLowerCase();
    const difficulty: any = d === "easy" || d === "medium" || d === "hard" ? d : undefined;

    const tags = Array.isArray(c.tags) ? c.tags.filter((t: any) => typeof t === "string") : undefined;
    out.push({ id, question, answer, difficulty, tags });
  }

  const seen = new Set<number>();
  const fixed: Flashcard[] = [];
  for (const c of out) {
    let id = c.id;
    while (seen.has(id)) id += 100000;
    seen.add(id);
    fixed.push({ ...c, id });
  }
  return fixed;
}

function normalizeSummary(input: any): StudySummary {
  const s = input || {};
  const title = typeof s.title === "string" ? s.title : "Resumo";

  const len = String(s.length || "").toLowerCase();
  const length: SummaryLength | undefined =
    len === "short" || len === "medium" || len === "long" ? (len as SummaryLength) : undefined;

  const mainTopicsRaw = Array.isArray(s.mainTopics) ? s.mainTopics : [];
  const mainTopics: SummaryTopic[] = mainTopicsRaw
    .map((t: any, idx: number) => {
      const tags = Array.isArray(t?.tags) ? t.tags.filter((x: any) => typeof x === "string") : undefined;
      return {
        id: Number.isFinite(Number(t?.id)) ? Number(t.id) : idx + 1,
        title: typeof t?.title === "string" ? t.title : `Tópico ${idx + 1}`,
        content: typeof t?.content === "string" ? t.content : "",
        icon: typeof t?.icon === "string" ? t.icon : "📌",
        tags,
      };
    })
    .filter((t: SummaryTopic) => t.title && t.content);

  const keyPoints = Array.isArray(s.keyPoints) ? s.keyPoints.filter((k: any) => typeof k === "string") : [];

  const sourceQuotesRaw = Array.isArray(s.sourceQuotes) ? s.sourceQuotes : [];
  const sourceQuotes: SourceQuote[] = sourceQuotesRaw
    .map((q: any) => ({
      quote: typeof q?.quote === "string" ? q.quote : "",
      whyItMatters: typeof q?.whyItMatters === "string" ? q.whyItMatters : "",
    }))
    .filter((q: SourceQuote) => q.quote && q.whyItMatters);

  return { title, length, mainTopics, keyPoints, sourceQuotes: sourceQuotes.length ? sourceQuotes : undefined };
}

export function normalizeFromApi(anyJson: any): StudyMaterial | null {
  if (!anyJson) return null;

  const payload =
    anyJson?.topic && anyJson?.flashcards
      ? anyJson
      : anyJson?.data?.topic && anyJson?.data?.flashcards
      ? anyJson.data
      : anyJson?.data?.data?.topic && anyJson?.data?.data?.flashcards
      ? anyJson.data.data
      : null;

  if (!payload) return null;

  const topic = typeof payload.topic === "string" ? payload.topic : "";
  if (!topic) return null;

  const tags = Array.isArray(payload.tags) ? payload.tags.filter((t: any) => typeof t === "string") : [];
  const flashcards = normalizeFlashcards(payload.flashcards);
  const summary = normalizeSummary(payload.summary);

  if (!flashcards.length || !summary?.mainTopics?.length) return null;

  return {
    topic,
    tags,
    flashcards,
    summary,
    createdAt: new Date().toISOString(),
  };
}

export function saveMaterial(material: StudyMaterial) {
  if (typeof window === "undefined") return;

  // garante docId
  const docId = material.docId || uid();
  const withId: StudyMaterial = { ...material, docId };

  // salva como “ativo”
  localStorage.setItem(KEY_LAST, JSON.stringify(withId));
  emit();

  // upsert na biblioteca
  const lib = safeParse<StudyMaterial[]>(localStorage.getItem(KEY_LIBRARY)) ?? [];
  const idx = lib.findIndex((m) => m.docId === docId);
  if (idx >= 0) lib[idx] = withId;
  else lib.unshift(withId);

  localStorage.setItem(KEY_LIBRARY, JSON.stringify(lib));
  emitLibrary();
}

export function loadMaterial(): StudyMaterial | null {
  if (typeof window === "undefined") return null;
  return safeParse<StudyMaterial>(localStorage.getItem(KEY_LAST));
}

export function listMaterials(): StudyMaterial[] {
  if (typeof window === "undefined") return [];
  return safeParse<StudyMaterial[]>(localStorage.getItem(KEY_LIBRARY)) ?? [];
}

export function loadMaterialById(docId: string): StudyMaterial | null {
  const lib = listMaterials();
  return lib.find((m) => m.docId === docId) ?? null;
}

export function setActiveMaterialById(docId: string) {
  const m = loadMaterialById(docId);
  if (!m || typeof window === "undefined") return false;
  localStorage.setItem(KEY_LAST, JSON.stringify(m));
  emit();
  return true;
}

export function deleteMaterial(docId: string) {
  if (typeof window === "undefined") return;
  const lib = listMaterials().filter((m) => m.docId !== docId);
  localStorage.setItem(KEY_LIBRARY, JSON.stringify(lib));

  const active = loadMaterial();
  if (active?.docId === docId) localStorage.removeItem(KEY_LAST);

  emit();
  emitLibrary();
}

export function clearMaterial() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY_LAST);
  emit();
}

export function onMaterialUpdated(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function onLibraryUpdated(cb: () => void) {
  libraryListeners.add(cb);
  return () => libraryListeners.delete(cb);
}
