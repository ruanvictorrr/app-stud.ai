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

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}
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

  const [cooldownSec, setCooldownSec] = useState<number>(0);
  const [lastApiJson, setLastApiJson] = useState<any>(null);

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

  useEffect(() => {
    if (cooldownSec <= 0) return;
    const t = window.setInterval(() => setCooldownSec((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => window.clearInterval(t);
  }, [cooldownSec]);

  function pickFile() {
    setMessage(null);
    inputRef.current?.click();
  }

  function clearAll() {
    setSelectedFile(null);
    setStatus("idle");
    setIsUploading(false);
    setMessage(null);
    setLastProcessedAt(null);
    setLastMaterial(null);
    setLastApiJson(null);
    setCooldownSec(0);
  }

  async function handleUpload(file: File) {
    setIsUploading(true);
    setStatus("uploading");
    setMessage("Processando…");
    setCooldownSec(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("flashcardsCount", String(clampInt(flashcardsCount, 1, 50)));
      formData.append("flashcardsDifficulty", difficulty);
      formData.append("summaryStyle", summaryStyle);

      const response = await fetch("/api/process-study-material", { method: "POST", body: formData });
      const json = await response.json().catch(() => null);
      setLastApiJson(json);

      // quota => 429 com retryAfterSeconds
      if (response.status === 429) {
        const retry = Number(json?.retryAfterSeconds);
        const retrySec = Number.isFinite(retry) ? retry : 30;
        setStatus("error");
        setCooldownSec(retrySec);
        setLastProcessedAt(new Date().toLocaleTimeString());
        setMessage(`Limite atingido. Tente novamente em ${retrySec}s.`);
        return;
      }

      if (!response.ok || !json?.success) {
        throw new Error(json?.details || json?.error || "Falha ao processar arquivo");
      }

      const material =
        normalizeFromApi(json) ||
        normalizeFromApi(json?.data) ||
        normalizeFromApi({ success: true, data: json?.data });

      if (!material) throw new Error("Resposta inválida: faltou topic/flashcards/summary.");

      saveMaterial(material);
      setLastMaterial(material);
      onDataProcessed?.(material);

      setStatus("success");
      setLastProcessedAt(new Date().toLocaleTimeString());
      setMessage("Arquivo processado com sucesso ✅");
    } catch (e: any) {
      setStatus("error");
      setLastProcessedAt(new Date().toLocaleTimeString());
      setMessage(e?.message || "Erro inesperado ❌");
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
    await handleUpload(file);
    e.target.value = "";
  }

  async function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    if (!file) return;
    setSelectedFile(file);
    setStatus("selected");
    setMessage("Arquivo selecionado. Processando…");
    await handleUpload(file);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  async function regenerate() {
    if (!selectedFile) return;
    await handleUpload(selectedFile);
  }

  const canNavigate = !!lastMaterial;

  return (
    <section className="w-full max-w-5xl mx-auto mt-10">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={onFileChange}
        accept="image/*,application/pdf,text/plain"
      />

      {/* Header premium */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="text-xs opacity-70">Upload</div>
            <h2 className="text-2xl font-semibold mt-1">Gerar materiais automaticamente</h2>
            <div className="mt-2 text-sm opacity-70">
              Selecione um arquivo e a IA cria flashcards e resumo no mesmo padrão do app.
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Chip tone={status === "success" ? "green" : "neutral"} label={status === "success" ? "✅ Sucesso" : "📄 Pronto"} />
            <Chip tone={status === "uploading" ? "neutral" : "neutral"} label={isUploading ? "⏳ Processando" : "⚙️ Config"} />
            <Chip tone={status === "error" ? "red" : "neutral"} label={status === "error" ? "❌ Falhou" : "✨ Stud.ai"} />
          </div>
        </div>

        {/* Config */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
          <Box>
            <div className="text-xs opacity-70">Quantidade de flashcards</div>
            <input
              type="number"
              min={1}
              max={50}
              value={flashcardsCount}
              onChange={(e) => setFlashcardsCount(clampInt(Number(e.target.value), 1, 50))}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 outline-none"
            />
            <div className="text-xs opacity-60 mt-1">1 a 50</div>
          </Box>

          <Box>
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
          </Box>

          <Box>
            <div className="text-xs opacity-70">Estilo do resumo</div>
            <select
              value={summaryStyle}
              onChange={(e) => setSummaryStyle(e.target.value as SummaryStyleUI)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 outline-none"
            >
              <option value="bullets">Bullets (objetivo)</option>
              <option value="detailed">Elaborado (explicativo)</option>
            </select>
          </Box>
        </div>

        {/* Status banner */}
        {message ? (
          <div
            className={cn(
              "mt-5 rounded-2xl border p-4 text-sm",
              status === "success" || canNavigate
                ? "border-[#00FF8B]/20 bg-[#00FF8B]/10 text-[#00FF8B]"
                : status === "error"
                ? "border-red-500/20 bg-red-500/10 text-red-200"
                : "border-white/10 bg-black/20 text-white/70"
            )}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="font-semibold">{message}</div>
                {lastProcessedAt ? <div className="text-xs opacity-70 mt-1">às {lastProcessedAt}</div> : null}
                {cooldownSec > 0 ? <div className="mt-2">⏳ Aguarde <b>{cooldownSec}s</b> para tentar novamente.</div> : null}
              </div>

              <div className="flex flex-wrap gap-2">
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
                    onClick={regenerate}
                    disabled={!selectedFile || isUploading || cooldownSec > 0}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 disabled:opacity-50"
                  >
                    {cooldownSec > 0 ? `Tentar em ${cooldownSec}s` : "Tentar novamente"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {/* File row */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs opacity-70">
            {selectedFile ? (
              <>
                Arquivo atual: <span className="opacity-90">{selectedFile.name}</span> • {formatBytes(selectedFile.size)}
              </>
            ) : (
              "Nenhum arquivo selecionado ainda."
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={regenerate}
              disabled={!selectedFile || isUploading || cooldownSec > 0}
              className="rounded-xl border border-[#00FF8B]/30 bg-[#00FF8B]/10 px-4 py-2 text-sm font-semibold text-[#00FF8B] hover:bg-[#00FF8B]/15 disabled:opacity-50"
            >
              Gerar novamente
            </button>
            <button
              onClick={pickFile}
              disabled={isUploading}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 disabled:opacity-50"
            >
              Trocar arquivo
            </button>
            <button
              onClick={clearAll}
              disabled={isUploading}
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm hover:bg-black/30 disabled:opacity-50"
            >
              Limpar
            </button>
          </div>
        </div>

        {/* Debug opcional */}
        {lastApiJson ? (
          <details className="mt-4 text-xs opacity-80">
            <summary className="cursor-pointer">Ver resposta da API (debug)</summary>
            <pre className="mt-2 whitespace-pre-wrap break-words rounded-xl border border-white/10 bg-black/20 p-3">
              {JSON.stringify(lastApiJson, null, 2)}
            </pre>
          </details>
        ) : null}
      </div>

      {/* Dropzone premium */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="mt-6 w-full rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-10 text-center"
      >
        <div className="text-lg font-semibold">Arraste e solte seu arquivo aqui</div>
        <div className="mt-2 text-sm opacity-70">ou clique para selecionar</div>

        <button
          onClick={pickFile}
          disabled={isUploading}
          className="mt-6 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 disabled:opacity-60 hover:bg-white/10"
        >
          {isUploading ? "Processando..." : "Selecionar arquivo"}
        </button>
      </div>
    </section>
  );
}

function Box({ children }: { children: any }) {
  return <div className="rounded-xl border border-white/10 bg-black/15 p-3">{children}</div>;
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
