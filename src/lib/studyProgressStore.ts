"use client";

/**
 * Store simples de progresso (localStorage) + "events" para atualizar UI.
 * Compatível com:
 * - makeProgressKey
 * - makeProgressKeyForDoc
 * - loadProgress
 * - saveProgress
 * - clearProgress
 * - onProgressUpdated
 */

type ProgressItem = {
  knownIds: number[];   // ids marcados como "sei"
  reviewIds: number[];  // ids marcados como "não sei"
  currentIndex: number; // índice atual no deck
  updatedAt: number;    // timestamp
};

const LS_PREFIX = "studai:progress:v1:";

function safeParse<T>(s: string | null): T | null {
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

function emit(key: string) {
  // evento custom local + evento nativo storage
  window.dispatchEvent(new CustomEvent("studai:progress-updated", { detail: { key } }));
}

export function makeProgressKey(userId: string, materialId: string) {
  return `${LS_PREFIX}${userId}:${materialId}`;
}

/**
 * Caso seu app trate material como "docId" (ou slug/uuid),
 * esse helper mantém compatibilidade com imports antigos.
 */
export function makeProgressKeyForDoc(userId: string, docId: string) {
  return `${LS_PREFIX}${userId}:doc:${docId}`;
}

export function loadProgress(key: string): ProgressItem | null {
  if (typeof window === "undefined") return null;
  return safeParse<ProgressItem>(localStorage.getItem(key));
}

export function saveProgress(key: string, progress: ProgressItem) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    key,
    JSON.stringify({
      knownIds: Array.from(new Set(progress.knownIds || [])),
      reviewIds: Array.from(new Set(progress.reviewIds || [])),
      currentIndex: Number.isFinite(progress.currentIndex) ? progress.currentIndex : 0,
      updatedAt: Date.now(),
    } satisfies ProgressItem)
  );
  emit(key);
}

export function clearProgress(key: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
  emit(key);
}

/**
 * Listener para componentes reagirem a mudanças de progresso.
 * Retorna um "unsubscribe".
 */
export function onProgressUpdated(cb: (key: string) => void) {
  if (typeof window === "undefined") return () => {};

  const handler = (ev: Event) => {
    const anyEv = ev as any;
    const key = anyEv?.detail?.key;
    if (typeof key === "string") cb(key);
  };

  window.addEventListener("studai:progress-updated", handler as any);

  // também escuta mudanças do localStorage (outra aba)
  const storageHandler = (ev: StorageEvent) => {
    if (!ev.key) return;
    if (ev.key.startsWith(LS_PREFIX)) cb(ev.key);
  };
  window.addEventListener("storage", storageHandler);

  return () => {
    window.removeEventListener("studai:progress-updated", handler as any);
    window.removeEventListener("storage", storageHandler);
  };
}
