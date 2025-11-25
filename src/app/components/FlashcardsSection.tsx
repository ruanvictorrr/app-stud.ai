"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Check, X } from "lucide-react";

interface FlashcardsSectionProps {
  data: any;
}

// Mock data para demonstração
const mockFlashcards = [
  {
    id: 1,
    question: "O que é fotossíntese?",
    answer: "Processo pelo qual plantas convertem luz solar em energia química, produzindo glicose e oxigênio a partir de CO2 e água.",
  },
  {
    id: 2,
    question: "Qual é a fórmula da fotossíntese?",
    answer: "6CO2 + 6H2O + luz → C6H12O6 + 6O2",
  },
  {
    id: 3,
    question: "Onde ocorre a fotossíntese?",
    answer: "Nos cloroplastos, organelas presentes nas células vegetais que contêm clorofila.",
  },
  {
    id: 4,
    question: "Quais são as duas fases da fotossíntese?",
    answer: "Fase clara (reações dependentes de luz) e fase escura (ciclo de Calvin).",
  },
  {
    id: 5,
    question: "O que é clorofila?",
    answer: "Pigmento verde presente nos cloroplastos responsável por absorver a luz solar para a fotossíntese.",
  },
];

export default function FlashcardsSection({ data }: FlashcardsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());

  const flashcards = data?.flashcards || mockFlashcards;
  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setStudiedCards((prev) => new Set(prev).add(currentCard.id));
  };

  const handleKnown = () => {
    setKnownCards((prev) => new Set(prev).add(currentCard.id));
    handleNext();
  };

  const handleUnknown = () => {
    setKnownCards((prev) => {
      const newSet = new Set(prev);
      newSet.delete(currentCard.id);
      return newSet;
    });
    handleNext();
  };

  const progress = (studiedCards.size / flashcards.length) * 100;
  const knownPercentage = (knownCards.size / flashcards.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">FlashCards</h2>
        <p className="text-gray-400">
          {studiedCards.size} de {flashcards.length} cards estudados
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Progresso</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00FF8B] to-[#007B5F] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#252525]">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-4 h-4 text-[#00FF8B]" />
            <span className="text-sm text-gray-400">Conhecidos</span>
          </div>
          <p className="text-2xl font-bold text-white">{knownCards.size}</p>
        </div>
        <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#252525]">
          <div className="flex items-center gap-2 mb-2">
            <X className="w-4 h-4 text-red-400" />
            <span className="text-sm text-gray-400">Para revisar</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {flashcards.length - knownCards.size}
          </p>
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative" style={{ perspective: "1000px" }}>
        <div
          onClick={handleFlip}
          className={`
            relative w-full min-h-[400px] cursor-pointer transition-all duration-500
            ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
          `}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border-2 border-[#00FF8B]/30 p-8 flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="mb-4 px-4 py-2 rounded-full bg-[#00FF8B]/10 text-[#00FF8B] text-sm font-medium">
              Pergunta {currentIndex + 1}/{flashcards.length}
            </div>
            <p className="text-xl sm:text-2xl font-semibold text-white leading-relaxed">
              {currentCard.question}
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm text-gray-400">
              <RotateCw className="w-4 h-4" />
              <span>Clique para ver a resposta</span>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00FF8B]/10 to-[#007B5F]/10 border-2 border-[#00FF8B] p-8 flex flex-col items-center justify-center text-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="mb-4 px-4 py-2 rounded-full bg-[#00FF8B] text-[#0D0D0D] text-sm font-bold">
              Resposta
            </div>
            <p className="text-lg sm:text-xl text-white leading-relaxed">
              {currentCard.answer}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={handlePrevious}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1A1A1A] hover:bg-[#252525] text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Anterior
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleUnknown}
            disabled={!isFlipped}
            className="px-6 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Não sei
          </button>
          <button
            onClick={handleKnown}
            disabled={!isFlipped}
            className="px-6 py-3 rounded-xl bg-[#00FF8B]/10 hover:bg-[#00FF8B]/20 text-[#00FF8B] font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            Sei
          </button>
        </div>

        <button
          onClick={handleNext}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00FF8B] hover:bg-[#00FF8B]/90 text-[#0D0D0D] font-bold transition-all duration-300 flex items-center justify-center gap-2"
        >
          Próximo
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
