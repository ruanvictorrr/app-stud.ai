"use client";

import { useEffect, useRef, useState } from "react";
import { normalizeFromApi, saveMaterial } from "@/lib/studyMaterialStore";

type DifficultyUI = "easy" | "medium" | "hard" | "random";
type SummaryStyleUI = "bullets" | "detailed";
type Section = "upload" | "flashcards" | "summary" | "progress";

type Props = {
  onDataProcessed?: (data: any) => void;
  onNavigate?: (section: Section) => void;
};

type Status = "idle" | "selected" | "uploading" | "success" | "error";

const PREFS_KEY = "studai:genPrefs:v1";

function clampInt(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, Math.trunc(n)));
}

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes)) return "";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = bytes;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function difficultyLabel(d: DifficultyUI) {
  if (d === "easy") return "fácil";
  if (d === "medium") return "médio";
  if (d === "hard") return "difícil";
  return "aleatório";
}

function summaryLabel(s: SummaryStyleUI) {
  return s === "bullets" ? "resumo bullets" : "resumo elaborado";
}

function isApiSuccess(json: any) {
  if (!json) return false;
  return json?.success === true || json?.data?.success === true;
}

function extractPayload(json: any) {
  if (!json) return null;
  if (json?.data && json?.success === true) return json.data;
  if (json?.data?.data && json?.data?.success === true) return json.data.data;
  return json?.data ?? null;
}

export default function UploadSection({ onDataProcessed, onNavigate }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [isUploading, setIsUploading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [flashcardsCount, setFlashcardsCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<DifficultyUI>("random");
  const [summaryStyle, setSummaryStyle] = useState<SummaryStyleUI>("bullets");

  const [message, setMessage] = useState<string | null>(null);
  const [lastProcessedAt, setLastProcessedAt] = useState<string | null>(null);

  const [lastMaterial, setLastMaterial] = useState<any>(null);
  const [lastApiJson, setLastApiJson] = useState<any>(null);

  // ✅ cooldown p/ 429 (quota)
  const [cooldownSec, setCooldownSec] = useState<number>(0);

  const [lastUsed, setLastUsed] = useState<{
    flashcardsCount: number;
    difficulty: DifficultyUI;
    summaryStyle: SummaryStyleUI;
  } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (!raw) return;
      const p = JSON.parse(raw);
      if (p?.flashcardsCount) setFlashcardsCount(clampInt(Number(p.flashcardsCount), 1, 50));
      if (p?.difficulty) setDifficulty(p.difficulty);
      if (p?.summaryStyle) setSummaryStyle(p.summaryStyle);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ flashcardsCount, difficulty, summaryStyle }));
    } catch {}
  }, [flashcardsCount, difficulty, summaryStyle]);

  // ✅ timer do cooldown
  useEffect(() => {
    if (cooldownSec <= 0) return;
    const t = window.setInterval(() => {
      setCooldownSec((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(t);
  }, [cooldownSec]);

  function onPickFile() {
    setMessage(null);
    inputRef.current?.click();
  }

  function clearSelection() {
    setSelectedFile(null);
    setStatus("idle");
    setMessage(null);
    setLastProcessedAt(null);
    setLastUsed(null);
    setLastMaterial(null);
    setLastApiJson(null);
    setCooldownSec(0);
  }

  async function handleUpload(file: File, opts?: { silentSelectMessage?: boolean }) {
    if (!opts?.silentSelectMessage) setMessage(null);

    setIsUploading(true);
    setStatus("uploading");
    setMessage("Processando…");
    setCooldownSec(0);

    const used = {
      flashcardsCount: clampInt(flashcardsCount, 1, 50),
      difficulty,
      summaryStyle,
    };
    setLastUsed(used);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("flashcardsCount", String(used.flashcardsCount));
      formData.append("flashcardsDifficulty", used.difficulty);
      formData.append("summaryStyle", used.summaryStyle);

      const response = await fetch("/api/process-study-material", {
        method: "POST",
        body: formData,
      });

      const json = await response.json().catch(() => null);
      setLastApiJson(json);

      // ✅ 429: quota — mostra countdown
      if (response.status === 429) {
        const retry = Number(json?.retryAfterSeconds);
        const retrySec = Number.isFinite(retry) ? retry : 45;

        setStatus("error");
        setCooldownSec(retrySec);
        setLastProcessedAt(new Date().toLocaleTimeString());
        setMessage(`Limite da cota do Gemini atingido. Tente novamente em ${retrySec}s.`);
        return;
      }

      const ok = response.ok && isApiSuccess(json);
      const payload = extractPayload(json);

      if (!ok || !payload) {
        const errMsg =
          json?.details ||
          json?.error ||
          json?.data?.details ||
          json?.data?.error ||
          `Falha ao processar (HTTP ${response.status})`;
        throw new Error(errMsg);
      }

      // ✅ NORMALIZA + SALVA NO STORE
      const material =
        normalizeFromApi(payload) ||
        normalizeFromApi({ success: true, data: payload }) ||
        normalizeFromApi(json);

      if (!material) {
        throw new Error("A API respondeu, mas não veio topic/flashcards/summary no formato esperado.");
      }

      saveMaterial(material);
      setLastMaterial(material);
      onDataProcessed?.(material);

      setStatus("success");
      setMessage("Arquivo processado com sucesso! ✅");
      setLastProcessedAt(new Date().toLocaleTimeString());
    } catch (e: any) {
      console.error(e);
      setStatus("error");
      setMessage(e?.message || "Falha ao processar arquivo ❌");
      setLastProcessedAt(new Date().toLocaleTimeString());
    } finally {
      setIsUploading(false);
    }
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    setSelectedFile(file);
    setStatus("selected");
    setMessage("Arquivo selecionado. Processando…");

    await handleUpload(file, { silentSelectMessage: true });
    e.target.value = "";
  }

  async function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    if (!file) return;

    setSelectedFile(file);
    setStatus("selected");
    setMessage("Arquivo selecionado. Processando…");

    await handleUpload(file, { silentSelectMessage: true });
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  async function onRegenerate() {
    if (!selectedFile) return;
    setMessage("Reprocessando com as novas configurações…");
    await handleUpload(selectedFile, { silentSelectMessage: true });
  }

  const lastUsedPreview =
    lastUsed
      ? `${lastUsed.flashcardsCount} flashcards • ${difficultyLabel(lastUsed.difficulty)} • ${summaryLabel(
          lastUsed.summaryStyle
        )}`
      : null;

  const canNavigate = !!lastMaterial;

  return (
    <section className="w-full">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={onFileChange}
        accept="image/*,application/pdf,text/plain"
      />

      <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="text-sm opacity-70">Configurações</div>
            <div className="text-base font-semibold">Como gerar seus materiais</div>
          </div>

          <div className="text-xs opacity-70">
            {status === "uploading" ? "⏳ Processando..." : null}
            {status === "success" ? "✅ Sucesso" : null}
            {status === "error" ? "❌ Falhou" : null}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-white/10 bg-black/10 p-3">
            <div className="text-xs opacity-70">Quantidade de flashcards</div>
            <input
              type="number"
              min={1}
              max={50}
              value={flashcardsCount}
              onChange={(e) => setFlashcardsCount(clampInt(Number(e.target.value), 1, 50))}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 outline-none"
            />
            <div className="mt-1 text-xs opacity-60">1 a 50</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/10 p-3">
            <div className="text-xs opacity-70">Dificuldade</div>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as DifficultyUI)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 outline-none"
            >
              <option value="easy">Fácil</option>
              <option value="medium">Médio</option>
              <option value="hard">Difícil</option>
              <option value="random">Aleatório</option>
            </select>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/10 p-3">
            <div className="text-xs opacity-70">Estilo do resumo</div>
            <select
              value={summaryStyle}
              onChange={(e) => setSummaryStyle(e.target.value as SummaryStyleUI)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 outline-none"
            >
              <option value="bullets">Bullets (objetivo)</option>
              <option value="detailed">Elaborado (explicativo)</option>
            </select>
          </div>
        </div>

        {(status === "success" || status === "error" || canNavigate) && lastUsedPreview ? (
          <div
            className={[
              "mt-4 rounded-xl border p-3 text-sm",
              canNavigate
                ? "border-[#00FF8B]/20 bg-[#00FF8B]/10 text-[#00FF8B]"
                : "border-red-500/20 bg-red-500/10 text-red-200",
            ].join(" ")}
          >
            <div className="font-semibold">{canNavigate ? "Gerado com:" : "Tentou gerar com:"}</div>
            <div className="opacity-90 mt-1">{lastUsedPreview}</div>
            {lastProcessedAt ? <div className="text-xs opacity-70 mt-1">às {lastProcessedAt}</div> : null}

            {/* ✅ quota cooldown */}
            {!canNavigate && cooldownSec > 0 ? (
              <div className="mt-3 text-sm opacity-90">
                ⏳ Aguarde <b>{cooldownSec}s</b> para tentar novamente.
              </div>
            ) : null}

            <div className="mt-3 flex flex-col sm:flex-row gap-2">
              {canNavigate ? (
                <>
                  <button
                    onClick={() => onNavigate?.("flashcards")}
                    className="rounded-xl border border-[#00FF8B]/30 bg-[#00FF8B]/10 px-4 py-2 text-sm font-semibold text-[#00FF8B] hover:bg-[#00FF8B]/15"
                  >
                    Ir para Flashcards
                  </button>

                  <button
                    onClick={() => onNavigate?.("summary")}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                  >
                    Ir para Resumo
                  </button>
                </>
              ) : (
                <button
                  onClick={onRegenerate}
                  disabled={!selectedFile || isUploading || cooldownSec > 0}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm disabled:opacity-50 hover:bg-white/10"
                >
                  {cooldownSec > 0 ? `Tentar novamente em ${cooldownSec}s` : "Tentar novamente"}
                </button>
              )}
            </div>
          </div>
        ) : null}

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs opacity-60">
            {selectedFile ? (
              <>
                Arquivo atual: <span className="opacity-90">{selectedFile.name}</span> • {formatBytes(selectedFile.size)}
              </>
            ) : (
              "Selecione um arquivo para gerar o conteúdo."
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRegenerate}
              disabled={!selectedFile || isUploading || cooldownSec > 0}
              className="rounded-xl border border-[#00FF8B]/30 bg-[#00FF8B]/10 px-4 py-2 text-sm font-semibold text-[#00FF8B] disabled:opacity-50 hover:bg-[#00FF8B]/15"
            >
              {cooldownSec > 0 ? `Aguarde ${cooldownSec}s` : "Gerar novamente"}
            </button>

            <button
              onClick={onPickFile}
              disabled={isUploading}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm disabled:opacity-50 hover:bg-white/10"
            >
              Trocar arquivo
            </button>

            <button
              onClick={clearSelection}
              disabled={isUploading}
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm disabled:opacity-50 hover:bg-black/30"
            >
              Limpar
            </button>
          </div>
        </div>

        {lastApiJson ? (
          <details className="mt-4 text-xs opacity-80">
            <summary className="cursor-pointer">Ver resposta da API (debug)</summary>
            <pre className="mt-2 whitespace-pre-wrap break-words rounded-xl border border-white/10 bg-black/20 p-3">
              {JSON.stringify(lastApiJson, null, 2)}
            </pre>
          </details>
        ) : null}
      </div>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="w-full rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-10 text-center"
      >
        <div className="text-lg font-semibold">Arraste e solte seu arquivo aqui</div>
        <div className="mt-2 text-sm opacity-70">ou clique para selecionar</div>

        <button
          onClick={onPickFile}
          disabled={isUploading}
          className="mt-6 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-2 disabled:opacity-60 hover:bg-white/10"
        >
          {isUploading ? "Processando..." : "Selecionar arquivo"}
        </button>

        {message ? (
          <div
            className={[
              "mt-4 text-sm",
              status === "success" || canNavigate
                ? "text-[#00FF8B]"
                : status === "error"
                ? "text-red-300"
                : "text-white/70",
            ].join(" ")}
          >
            {message}
          </div>
        ) : null}
      </div>
    </section>
  );
}
