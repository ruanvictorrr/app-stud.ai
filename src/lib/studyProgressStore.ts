export type StudyProgress = {
  knownIds: number[];
  reviewIds: number[];
  updatedAt?: string;
};

const PREFIX = "studai:progress:v1:";
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

export function makeProgressKey(topic: string, cardsCount: number) {
  const t = (topic || "").trim().toLowerCase().slice(0, 80);
  return `${t}::${cardsCount}`;
}

export function loadProgress(key: string): StudyProgress | null {
  if (typeof window === "undefined") return null;
  return safeParse<StudyProgress>(localStorage.getItem(PREFIX + key));
}

export function saveProgress(key: string, progress: StudyProgress) {
  if (typeof window === "undefined") return;

  const payload: StudyProgress = {
    knownIds: Array.isArray(progress.knownIds) ? progress.knownIds : [],
    reviewIds: Array.isArray(progress.reviewIds) ? progress.reviewIds : [],
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(PREFIX + key, JSON.stringify(payload));
  emit();
}

export function clearProgress(key?: string) {
  if (typeof window === "undefined") return;

  if (key) {
    localStorage.removeItem(PREFIX + key);
    emit();
    return;
  }

  // remove tudo que começa com PREFIX
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(PREFIX)) keysToRemove.push(k);
  }
  for (const k of keysToRemove) localStorage.removeItem(k);
  emit();
}

export function onProgressUpdated(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
