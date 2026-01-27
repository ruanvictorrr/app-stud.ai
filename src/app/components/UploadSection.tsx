"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Upload, Sparkles, RotateCcw, BookOpen, FileText } from "lucide-react";
import { loadMaterial, saveMaterial } from "@/lib/studyMaterialStore";

type SummaryStyle = "bullet" | "explained";
type Difficulty = "easy" | "medium" | "hard";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

export default function UploadSection({
  onDataProcessed,
  onGoFlashcards,
  onGoSummary,
}: {
  onDataProcessed?: (data: any) => void;
  onGoFlashcards?: () => void;
  onGoSummary?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [fileLabel, setFileLabel] = useState<string>("");

  const [summaryStyle, setSummaryStyle] = useState<SummaryStyle>("bullet");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [flashcardsCount, setFlashcardsCount] = useState<number>(10);

  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [apiRemaining, setApiRemaining] = useState<number | null>(null);
  const [provider, setProvider] = useState<string | null>(null);

  // carrega último material salvo (não some ao trocar de seção/página)
  useEffect(() => {
    const last = loadMaterial();
    if (last) {
      setSuccess(true);
      onDataProcessed?.(last);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canGenerate = useMemo(() => !!file && !isUploading, [file, isUploading]);

  function onPickFile() {
    inputRef.current?.click();
  }

  async function handleUpload(selectedFile: File) {
    setError(null);
    setIsUploading(true);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // ✅ opções do usuário
      formData.append("summaryStyle", summaryStyle);
      formData.append("difficulty", difficulty);
      formData.append("flashcardsCount", String(flashcardsCount));

      const response = await fetch("/api/process-study-material", {
        method: "POST",
        body: formData,
      });

      const json = await response.json().catch(() => null);

      if (!response.ok || !json?.success) {
        // erros “bons” do backend
        const msg =
          json?.error ||
          json?.details ||
          (response.status === 402
            ? "Você atingiu o limite do plano grátis."
            : response.status === 401
            ? "Você precisa estar logado para gerar."
            : response.status === 503
            ? "Modelo sobrecarregado. Tente novamente."
            : "Falha ao processar arquivo.");

        throw new Error(msg);
      }

      setProvider(json?.provider || null);
      setApiRemaining(typeof json?.remaining === "number" ? json.remaining : null);

      // backend retorna { success:true, data:{...} }
      const material = json?.data;

      if (!material?.topic || !material?.flashcards || !material?.summary) {
        throw new Error("Resposta inválida: faltou topic/flashcards/summary.");
      }

      // ✅ persiste para não sumir ao mudar de página/seção
      saveMaterial(material);
      onDataProcessed?.(material);

      setSuccess(true);
    } catch (e: any) {
      setSuccess(false);
      setError(e?.message || "Erro inesperado");
    } finally {
      setIsUploading(false);
    }
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);
    setFileLabel(`${f.name} • ${(f.size / 1024 / 1024).toFixed(2)} MB`);

    await handleUpload(f);

    // limpa input para permitir escolher o mesmo arquivo novamente
    e.target.value = "";
  }

  async function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (!f) return;

    setFile(f);
    setFileLabel(`${f.name} • ${(f.size / 1024 / 1024).toFixed(2)} MB`);

    await handleUpload(f);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  async function onGenerateAgain() {
    if (!file) {
      setError("Selecione um arquivo novamente para gerar.");
      return;
    }
    await handleUpload(file);
  }

  return (
    <section className="w-full">
      {/* input */}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={onFileChange}
        accept="image/*,application/pdf,text/plain"
      />

      {/* card */}
      <div className="rounded-2xl border border-[#1A1A1A] bg-[#0F0F0F] p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-[#00FF8B]/10 flex items-center justify-center border border-[#00FF8B]/20">
                <Upload className="h-5 w-5 text-[#00FF8B]" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold">Upload do material</h2>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Envie uma imagem, PDF ou texto para gerar flashcards e resumo automaticamente.
            </p>
          </div>

          {provider ? (
            <div className="hidden sm:flex items-center gap-2 text-xs px-3 py-2 rounded-full border border-[#1A1A1A] text-gray-400">
              <Sparkles className="h-4 w-4 text-[#00FF8B]" />
              <span>IA: {provider}</span>
              {typeof apiRemaining === "number" ? (
                <span className="text-gray-500">• restante: {apiRemaining}</span>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* opções */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-[#1A1A1A] bg-[#0D0D0D] p-4">
            <div className="text-sm font-medium mb-2">Tipo de resumo</div>
            <select
              value={summaryStyle}
              onChange={(e) => setSummaryStyle(e.target.value as SummaryStyle)}
              className="w-full rounded-lg bg-[#0B0B0B] border border-[#1A1A1A] px-3 py-2 text-sm"
              disabled={isUploading}
            >
              <option value="bullet">Bullet (tópicos)</option>
              <option value="explained">Explicado</option>
            </select>
          </div>

          <div className="rounded-xl border border-[#1A1A1A] bg-[#0D0D0D] p-4">
            <div className="text-sm font-medium mb-2">Dificuldade dos flashcards</div>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="w-full rounded-lg bg-[#0B0B0B] border border-[#1A1A1A] px-3 py-2 text-sm"
              disabled={isUploading}
            >
              <option value="easy">Fácil</option>
              <option value="medium">Média</option>
              <option value="hard">Difícil</option>
            </select>
          </div>

          <div className="rounded-xl border border-[#1A1A1A] bg-[#0D0D0D] p-4">
            <div className="text-sm font-medium mb-2">Quantidade de flashcards</div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={30}
                value={flashcardsCount}
                onChange={(e) => setFlashcardsCount(Number(e.target.value))}
                className="w-full"
                disabled={isUploading}
              />
              <div className="min-w-[44px] text-center text-sm font-semibold text-[#00FF8B]">
                {flashcardsCount}
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              (1 a 30 — depois a gente libera mais no PRO)
            </div>
          </div>
        </div>

        {/* dropzone */}
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className={cn(
            "mt-6 rounded-2xl border border-dashed p-8 sm:p-10 text-center transition",
            "border-[#2A2A2A] bg-[#0B0B0B]",
            isUploading ? "opacity-70" : "hover:border-[#00FF8B]/40"
          )}
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#1A1A1A] bg-[#0F0F0F]">
            <FileText className="h-6 w-6 text-gray-300" />
          </div>

          <div className="mt-4 text-base sm:text-lg font-semibold">
            Arraste e solte seu arquivo aqui
          </div>
          <div className="mt-2 text-sm text-gray-400">ou clique para selecionar</div>

          <button
            onClick={onPickFile}
            disabled={isUploading}
            className={cn(
              "mt-6 inline-flex items-center justify-center rounded-xl px-5 py-2 text-sm font-medium transition border",
              "border-[#1A1A1A] bg-[#121212] hover:bg-[#161616]",
              "disabled:opacity-60"
            )}
          >
            {isUploading ? "Processando..." : "Selecionar arquivo"}
          </button>

          {fileLabel ? (
            <div className="mt-4 text-xs text-gray-400">{fileLabel}</div>
          ) : null}

          {error ? <div className="mt-4 text-sm text-red-400">{error}</div> : null}
        </div>

        {/* sucesso + ações */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-sm text-gray-400">
            {success ? (
              <span className="text-[#00FF8B] font-medium">✅ Concluído! Material gerado.</span>
            ) : isUploading ? (
              <span>Gerando… isso pode levar alguns segundos.</span>
            ) : (
              <span>Depois de gerar, você pode ir direto para flashcards ou resumo.</span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={onGenerateAgain}
              disabled={!canGenerate}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium border transition",
                "border-[#1A1A1A] bg-[#121212] hover:bg-[#161616]",
                "disabled:opacity-60"
              )}
              title="Gerar novamente com novas opções"
            >
              <RotateCcw className="h-4 w-4" />
              Gerar novamente
            </button>

            <button
              onClick={onGoFlashcards}
              disabled={!success}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition border",
                success
                  ? "border-[#00FF8B]/30 bg-[#00FF8B]/10 text-[#00FF8B] hover:bg-[#00FF8B]/15"
                  : "border-[#1A1A1A] bg-[#121212] text-gray-500",
                "disabled:opacity-60"
              )}
            >
              <BookOpen className="h-4 w-4" />
              Ir para flashcards
            </button>

            <button
              onClick={onGoSummary}
              disabled={!success}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition border",
                success
                  ? "border-[#00FF8B]/30 bg-[#00FF8B]/10 text-[#00FF8B] hover:bg-[#00FF8B]/15"
                  : "border-[#1A1A1A] bg-[#121212] text-gray-500",
                "disabled:opacity-60"
              )}
            >
              <Sparkles className="h-4 w-4" />
              Ir para resumo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
