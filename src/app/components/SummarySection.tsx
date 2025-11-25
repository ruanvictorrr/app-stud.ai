"use client";

import { BookOpen, Lightbulb, Target, Sparkles } from "lucide-react";

interface SummarySectionProps {
  data: any;
}

// Mock data para demonstração
const mockSummary = {
  title: "Fotossíntese - Resumo Completo",
  mainTopics: [
    {
      id: 1,
      title: "Conceito Fundamental",
      content:
        "A fotossíntese é o processo biológico pelo qual organismos fotossintetizantes (principalmente plantas, algas e algumas bactérias) convertem energia luminosa em energia química. Este processo é essencial para a vida na Terra, pois produz oxigênio e serve como base da cadeia alimentar.",
      icon: "🌱",
    },
    {
      id: 2,
      title: "Equação Química",
      content:
        "6CO2 + 6H2O + energia luminosa → C6H12O6 + 6O2. Esta equação representa a conversão de dióxido de carbono e água em glicose e oxigênio, utilizando a energia da luz solar.",
      icon: "⚗️",
    },
    {
      id: 3,
      title: "Fases do Processo",
      content:
        "Fase Clara (reações dependentes de luz): Ocorre nos tilacoides, onde a luz é absorvida pela clorofila, produzindo ATP e NADPH. Fase Escura (Ciclo de Calvin): Ocorre no estroma, onde CO2 é fixado e convertido em glicose usando ATP e NADPH.",
      icon: "🔄",
    },
    {
      id: 4,
      title: "Importância Ecológica",
      content:
        "A fotossíntese é responsável pela produção de aproximadamente 70% do oxigênio atmosférico. Além disso, remove CO2 da atmosfera, ajudando a regular o clima global e fornecendo a base energética para praticamente todos os ecossistemas terrestres e aquáticos.",
      icon: "🌍",
    },
  ],
  keyPoints: [
    "Cloroplastos são as organelas onde ocorre a fotossíntese",
    "Clorofila é o pigmento que absorve luz (principalmente azul e vermelha)",
    "Plantas C3, C4 e CAM possuem diferentes adaptações fotossintéticas",
    "Fatores limitantes: luz, CO2, temperatura e disponibilidade de água",
  ],
};

export default function SummarySection({ data }: SummarySectionProps) {
  const summary = data?.summary || mockSummary;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FF8B]/10 border border-[#00FF8B]/30">
          <Sparkles className="w-4 h-4 text-[#00FF8B]" />
          <span className="text-sm font-medium text-[#00FF8B]">
            Gerado por IA
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          {summary.title}
        </h2>
      </div>

      {/* Main Topics */}
      <div className="space-y-4">
        {summary.mainTopics.map((topic: any, index: number) => (
          <div
            key={topic.id}
            className="group p-6 rounded-xl bg-[#1A1A1A] border border-[#252525] hover:border-[#00FF8B]/30 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#00FF8B]/20 to-[#007B5F]/20 flex items-center justify-center text-2xl">
                {topic.icon}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#00FF8B]">
                    TÓPICO {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#00FF8B] transition-colors">
                  {topic.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{topic.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Points */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-[#00FF8B]/5 to-[#007B5F]/5 border border-[#00FF8B]/20">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-[#00FF8B]" />
          <h3 className="text-lg font-bold text-white">Pontos-Chave</h3>
        </div>
        <ul className="space-y-3">
          {summary.keyPoints.map((point: string, index: number) => (
            <li key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00FF8B]/20 flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 rounded-full bg-[#00FF8B]" />
              </div>
              <span className="text-gray-300">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Study Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-xl bg-[#1A1A1A] border border-[#252525]">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-[#00FF8B]" />
            <h4 className="font-semibold text-white">Dica de Estudo</h4>
          </div>
          <p className="text-sm text-gray-400">
            Revise este resumo antes de praticar com os flashcards para melhor
            fixação do conteúdo.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-[#1A1A1A] border border-[#252525]">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-[#00FF8B]" />
            <h4 className="font-semibold text-white">Próximo Passo</h4>
          </div>
          <p className="text-sm text-gray-400">
            Teste seu conhecimento na seção de FlashCards e acompanhe seu
            progresso.
          </p>
        </div>
      </div>
    </div>
  );
}
