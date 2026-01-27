// src/lib/studyMaterialStore.ts
export type Flashcard = {
  id: number;
  question: string;
  answer: string;
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
  flashcards: Flashcard[];
  summary: StudySummary;
  // opcionais (se você quiser usar depois)
  materialId?: string;
  createdAt?: string;
};

const STORAGE_KEY = "studai:lastMaterial:v1";
const EVENT_NAME = "studai:material_updated";

export function normalizeFromApi(payload: any): StudyMaterial | null {
  // aceita:
  // - { success:true, data:{...} }
  // - { topic, flashcards, summary }
  const data = payload?.data ?? payload;

  const topic = data?.topic;
  const flashcards = data?.flashcards;
  const summary = data?.summary;

  if (!topic || !Array.isArray(flashcards) || !summary) return null;

  if (
    typeof summary?.title !== "string" ||
    !Array.isArray(summary?.mainTopics) ||
    !Array.isArray(summary?.keyPoints)
  ) {
    return null;
  }

  return {
    topic,
    flashcards,
    summary,
    materialId: payload?.meta?.materialId ?? payload?.materialId ?? data?.materialId,
    createdAt: new Date().toISOString(),
  };
}

export function saveMaterial(material: StudyMaterial) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(material));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function loadMaterial(): StudyMaterial | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StudyMaterial;
  } catch {
    return null;
  }
}

export function clearMaterial() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function onMaterialUpdated(cb: () => void) {
  if (typeof window === "undefined") return () => {};

  const handler = () => cb();
  window.addEventListener(EVENT_NAME, handler);

  // também reage quando outro tab atualiza
  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb();
  };
  window.addEventListener("storage", storageHandler);

  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", storageHandler);
  };
}
