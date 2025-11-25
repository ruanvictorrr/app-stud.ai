"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface UploadSectionProps {
  onDataProcessed: (data: any) => void;
}

export default function UploadSection({ onDataProcessed }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processResult, setProcessResult] = useState<any>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setUploadedFile(file);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/process-study-material", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao processar arquivo");
      }

      const data = await response.json();
      setProcessResult(data);
      onDataProcessed(data);
      toast.success("Material processado com sucesso! 🎉");
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao processar o arquivo. Tente novamente.");
      setProcessResult({ error: true });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        processFile(files[0]);
      }
    },
    []
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Transforme seus estudos
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          Faça upload de fotos, PDFs ou documentos e deixe a IA criar flashcards e resumos inteligentes para você
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 sm:p-12 transition-all duration-300
          ${
            isDragging
              ? "border-[#00FF8B] bg-[#00FF8B]/5"
              : "border-[#1A1A1A] hover:border-[#00FF8B]/50"
          }
          ${isProcessing ? "pointer-events-none opacity-50" : ""}
        `}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          disabled={isProcessing}
        />

        <label
          htmlFor="file-upload"
          className="flex flex-col items-center gap-6 cursor-pointer"
        >
          {isProcessing ? (
            <>
              <div className="w-20 h-20 rounded-full bg-[#00FF8B]/10 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#00FF8B] animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-white">Processando seu material...</p>
                <p className="text-sm text-gray-400 mt-2">A IA está analisando o conteúdo</p>
              </div>
            </>
          ) : uploadedFile && processResult && !processResult.error ? (
            <>
              <div className="w-20 h-20 rounded-full bg-[#00FF8B]/10 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-[#00FF8B]" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-white">Arquivo processado!</p>
                <p className="text-sm text-gray-400 mt-2">{uploadedFile.name}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setUploadedFile(null);
                    setProcessResult(null);
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#1A1A1A] hover:bg-[#252525] text-sm font-medium transition-colors"
                >
                  Fazer novo upload
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00FF8B]/20 to-[#007B5F]/20 flex items-center justify-center">
                <Upload className="w-10 h-10 text-[#00FF8B]" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-white">
                  Arraste e solte seu arquivo aqui
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  ou clique para selecionar
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Imagens</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>PDFs</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Documentos</span>
                </div>
              </div>
            </>
          )}
        </label>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon="🎯"
          title="Flashcards Inteligentes"
          description="Perguntas e respostas geradas automaticamente"
        />
        <FeatureCard
          icon="📝"
          title="Resumos Estruturados"
          description="Conteúdo organizado em tópicos principais"
        />
        <FeatureCard
          icon="📊"
          title="Acompanhe seu Progresso"
          description="Visualize sua evolução nos estudos"
        />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl bg-[#1A1A1A] border border-[#252525] hover:border-[#00FF8B]/30 transition-all duration-300 group">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00FF8B] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
