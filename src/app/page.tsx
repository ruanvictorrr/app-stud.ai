"use client";

import { useState } from "react";
import { Upload, Sparkles, BookOpen, TrendingUp, Trophy, Users } from "lucide-react";
import UploadSection from "./components/UploadSection";
import FlashcardsSection from "./components/FlashcardsSection";
import SummarySection from "./components/SummarySection";
import ProgressSection from "./components/ProgressSection";

type Section = "upload" | "flashcards" | "summary" | "progress";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("upload");
  const [studyData, setStudyData] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <header className="border-b border-[#1A1A1A] backdrop-blur-sm bg-[#0D0D0D]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00FF8B] to-[#007B5F] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#0D0D0D]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#00FF8B] to-[#007B5F] bg-clip-text text-transparent">
                Stud.ai
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <NavButton icon={Upload} label="Upload" active={activeSection === "upload"} onClick={() => setActiveSection("upload")} />
              <NavButton icon={BookOpen} label="FlashCards" active={activeSection === "flashcards"} onClick={() => setActiveSection("flashcards")} />
              <NavButton icon={Sparkles} label="Resumos" active={activeSection === "summary"} onClick={() => setActiveSection("summary")} />
              <NavButton icon={TrendingUp} label="Progresso" active={activeSection === "progress"} onClick={() => setActiveSection("progress")} />
            </nav>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-[#00FF8B]/20">
              <Trophy className="w-4 h-4 text-[#00FF8B]" />
              <span className="text-sm font-medium">Nível 5</span>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto">
            <NavButton icon={Upload} label="Upload" active={activeSection === "upload"} onClick={() => setActiveSection("upload")} mobile />
            <NavButton icon={BookOpen} label="Cards" active={activeSection === "flashcards"} onClick={() => setActiveSection("flashcards")} mobile />
            <NavButton icon={Sparkles} label="Resumos" active={activeSection === "summary"} onClick={() => setActiveSection("summary")} mobile />
            <NavButton icon={TrendingUp} label="Progresso" active={activeSection === "progress"} onClick={() => setActiveSection("progress")} mobile />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeSection === "upload" && (
          <UploadSection
            onDataProcessed={(data) => {
              setStudyData(data);
            }}
            onNavigate={(section) => setActiveSection(section)}
          />
        )}

        {activeSection === "flashcards" && <FlashcardsSection data={studyData} />}
        {activeSection === "summary" && <SummarySection data={studyData} />}
        {activeSection === "progress" && <ProgressSection />}
      </main>

      <footer className="border-t border-[#1A1A1A] mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Users className="w-4 h-4 text-[#00FF8B]" />
              <span>+1.2k estudantes ativos hoje</span>
            </div>
            <div className="text-sm text-gray-500">Feito com 💚 para estudantes</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavButton({
  icon: Icon,
  label,
  active,
  onClick,
  mobile = false,
}: {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
  mobile?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
        ${mobile ? "text-xs whitespace-nowrap" : "text-sm"}
        ${
          active
            ? "bg-[#00FF8B]/10 text-[#00FF8B] border border-[#00FF8B]/30"
            : "text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
        }
      `}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
