export type SessionAction = "known" | "review";

export type StudySession = {
  id: string;
  docId: string;

  startedAt: string;
  endedAt?: string;

  mode: "session" | "deck";
  sessionSize: number;

  // métricas
  knownCount: number;
  reviewCount: number;
  answeredCount: number;

  durationSec?: number;
  accuracyPct?: number; // known / (known+review)
};

const KEY = "studai:sessions:v1";
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

function uid() {
  // browser + fallback
  // @ts-ignore
  return (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : `sess_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function readAll(): StudySession[] {
  if (typeof window === "undefined") return [];
  return safeParse<StudySession[]>(localStorage.getItem(KEY)) ?? [];
}

function writeAll(list: StudySession[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
  emit();
}

export function startSession(params: {
  docId: string;
  mode: "session" | "deck";
  sessionSize: number;
}) {
  const s: StudySession = {
    id: uid(),
    docId: params.docId,
    startedAt: new Date().toISOString(),
    mode: params.mode,
    sessionSize: params.sessionSize,
    knownCount: 0,
    reviewCount: 0,
    answeredCount: 0,
  };

  const all = readAll();
  all.unshift(s);
  writeAll(all);
  return s.id;
}

export function recordSessionAction(sessionId: string, action: SessionAction) {
  const all = readAll();
  const i = all.findIndex((x) => x.id === sessionId);
  if (i < 0) return;

  const s = all[i];
  const next: StudySession = {
    ...s,
    knownCount: action === "known" ? s.knownCount + 1 : s.knownCount,
    reviewCount: action === "review" ? s.reviewCount + 1 : s.reviewCount,
    answeredCount: s.answeredCount + 1,
  };

  all[i] = next;
  writeAll(all);
}

export function endSession(sessionId: string) {
  const all = readAll();
  const i = all.findIndex((x) => x.id === sessionId);
  if (i < 0) return;

  const s = all[i];
  const endedAt = new Date().toISOString();
  const durationSec = Math.max(
    0,
    Math.round((new Date(endedAt).getTime() - new Date(s.startedAt).getTime()) / 1000)
  );
  const denom = s.knownCount + s.reviewCount;
  const accuracyPct = denom > 0 ? Math.round((s.knownCount / denom) * 100) : 0;

  all[i] = { ...s, endedAt, durationSec, accuracyPct };
  writeAll(all);
}

export function listSessions(docId?: string) {
  const all = readAll();
  const filtered = docId ? all.filter((s) => s.docId === docId) : all;
  // ordena mais recente primeiro
  return filtered.sort((a, b) => (b.startedAt || "").localeCompare(a.startedAt || ""));
}

export function onSessionsUpdated(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function clearSessions(docId?: string) {
  const all = readAll();
  if (!docId) {
    writeAll([]);
    return;
  }
  writeAll(all.filter((s) => s.docId !== docId));
}
