export type FlashcardDifficulty = "easy" | "medium" | "hard";

export type Flashcard = {
  id: number;
  question: string;
  answer: string;
  difficulty?: FlashcardDifficulty;
  tags?: string[];
};

export type SummaryTopic = {
  id: number;
  title: string;
  content: string;
  icon: string;
};

export type StudySummary = {
  title: string;
  mainTopics: SummaryTopic[];
  keyPoints: string[];
};

export type StudyMaterial = {
  topic: string;
  tags?: string[];
  flashcards: Flashcard[];
  summary: StudySummary;
  createdAt?: string;
};

const KEY = "studai:lastMaterial:v1";
const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) {
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

  // remove ids duplicados (garante unicidade)
  const seen = new Set<number>();
  const fixed: Flashcard[] = [];
  for (const c of out) {
    let id = c.id;
    while (seen.has(id)) id += 100000; // desloca pra não colidir
    seen.add(id);
    fixed.push({ ...c, id });
  }

  return fixed;
}

function normalizeSummary(input: any): StudySummary {
  const s = input || {};
  const title = typeof s.title === "string" ? s.title : "Resumo";

  const mainTopicsRaw = Array.isArray(s.mainTopics) ? s.mainTopics : [];
  const mainTopics: SummaryTopic[] = mainTopicsRaw
    .map((t: any, idx: number) => ({
      id: Number.isFinite(Number(t?.id)) ? Number(t.id) : idx + 1,
      title: typeof t?.title === "string" ? t.title : `Tópico ${idx + 1}`,
      content: typeof t?.content === "string" ? t.content : "",
      icon: typeof t?.icon === "string" ? t.icon : "📌",
    }))
    .filter((t: SummaryTopic) => t.title && t.content);

  const keyPoints = Array.isArray(s.keyPoints)
    ? s.keyPoints.filter((k: any) => typeof k === "string")
    : [];

  return { title, mainTopics, keyPoints };
}

/**
 * Aceita tanto:
 *  - payload direto (data)
 *  - resposta completa da API {success, data}
 *  - resposta aninhada {data:{success,data}}
 */
export function normalizeFromApi(anyJson: any): StudyMaterial | null {
  if (!anyJson) return null;

  const payload =
    anyJson?.topic && anyJson?.flashcards ? anyJson
    : anyJson?.data?.topic && anyJson?.data?.flashcards ? anyJson.data
    : anyJson?.data?.data?.topic && anyJson?.data?.data?.flashcards ? anyJson.data.data
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
  localStorage.setItem(KEY, JSON.stringify(material));
  emit();
}

export function loadMaterial(): StudyMaterial | null {
  if (typeof window === "undefined") return null;
  return safeParse<StudyMaterial>(localStorage.getItem(KEY));
}

export function clearMaterial() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  emit();
}

export function onMaterialUpdated(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
