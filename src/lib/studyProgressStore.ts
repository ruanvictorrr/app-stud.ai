export type StudyProgress = {
  knownIds: number[];
  reviewIds: number[];
  updatedAt?: string;
};

const PREFIX_LEGACY = "studai:progress:v1:";
const PREFIX_DOC = "studai:progress:v2:doc:";
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

function slugify(input: string) {
  return (input || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

// legado (não quebra imports antigos)
export function makeProgressKey(topic: string, count: number) {
  const t = slugify(topic || "deck");
  const c = Number.isFinite(count) ? Math.trunc(count) : 0;
  return `${PREFIX_LEGACY}${t}:${c}`;
}

// novo (por doc)
export function makeProgressKeyForDoc(docId: string) {
  return `${PREFIX_DOC}${docId}`;
}

export function loadProgress(key: string): StudyProgress | null {
  if (typeof window === "undefined") return null;
  return safeParse<StudyProgress>(localStorage.getItem(key));
}

export function saveProgress(key: string, progress: StudyProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(progress));
  emit();
}

export function clearProgress(key?: string) {
  if (typeof window === "undefined") return;

  if (key) {
    localStorage.removeItem(key);
    emit();
    return;
  }

  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k) continue;
    if (k.startsWith(PREFIX_LEGACY) || k.startsWith(PREFIX_DOC)) keys.push(k);
  }
  keys.forEach((k) => localStorage.removeItem(k));
  emit();
}

export function onProgressUpdated(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
