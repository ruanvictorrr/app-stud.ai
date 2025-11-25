"use client";

import { Trophy, Target, Flame, TrendingUp, Award, Star } from "lucide-react";

export default function ProgressSection() {
  // Mock data para demonstração
  const stats = {
    studyStreak: 7,
    totalCards: 156,
    masteredCards: 89,
    studyTime: 12.5,
    level: 5,
    xp: 2340,
    nextLevelXp: 3000,
  };

  const weeklyProgress = [
    { day: "Seg", hours: 2.5, cards: 15 },
    { day: "Ter", hours: 1.8, cards: 12 },
    { day: "Qua", hours: 3.2, cards: 20 },
    { day: "Qui", hours: 2.0, cards: 16 },
    { day: "Sex", hours: 1.5, cards: 10 },
    { day: "Sáb", hours: 0.8, cards: 5 },
    { day: "Dom", hours: 1.2, cards: 8 },
  ];

  const badges = [
    { id: 1, name: "Iniciante", icon: "🎯", earned: true },
    { id: 2, name: "Dedicado", icon: "💪", earned: true },
    { id: 3, name: "Sequência 7 dias", icon: "🔥", earned: true },
    { id: 4, name: "100 Cards", icon: "📚", earned: true },
    { id: 5, name: "Mestre", icon: "👑", earned: false },
    { id: 6, name: "Lendário", icon: "⭐", earned: false },
  ];

  const maxHours = Math.max(...weeklyProgress.map((d) => d.hours));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Seu Progresso
        </h2>
        <p className="text-gray-400">
          Continue assim! Você está indo muito bem 🚀
        </p>
      </div>

      {/* Level Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00FF8B]/10 to-[#007B5F]/10 border border-[#00FF8B]/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FF8B] to-[#007B5F] flex items-center justify-center">
              <Trophy className="w-6 h-6 text-[#0D0D0D]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Nível Atual</p>
              <p className="text-2xl font-bold text-white">{stats.level}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">XP</p>
            <p className="text-lg font-bold text-[#00FF8B]">
              {stats.xp} / {stats.nextLevelXp}
            </p>
          </div>
        </div>
        <div className="h-3 bg-[#1A1A1A] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00FF8B] to-[#007B5F] transition-all duration-500"
            style={{ width: `${(stats.xp / stats.nextLevelXp) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          {stats.nextLevelXp - stats.xp} XP para o próximo nível
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Flame}
          label="Sequência"
          value={`${stats.studyStreak} dias`}
          color="text-orange-400"
        />
        <StatCard
          icon={Target}
          label="Cards Dominados"
          value={`${stats.masteredCards}/${stats.totalCards}`}
          color="text-[#00FF8B]"
        />
        <StatCard
          icon={TrendingUp}
          label="Tempo de Estudo"
          value={`${stats.studyTime}h`}
          color="text-blue-400"
        />
        <StatCard
          icon={Award}
          label="Badges"
          value={`${badges.filter((b) => b.earned).length}/${badges.length}`}
          color="text-purple-400"
        />
      </div>

      {/* Weekly Progress Chart */}
      <div className="p-6 rounded-xl bg-[#1A1A1A] border border-[#252525]">
        <h3 className="text-lg font-bold text-white mb-6">
          Atividade Semanal
        </h3>
        <div className="flex items-end justify-between gap-2 h-48">
          {weeklyProgress.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full flex flex-col items-center justify-end flex-1">
                <div
                  className="w-full bg-gradient-to-t from-[#00FF8B] to-[#007B5F] rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer group relative"
                  style={{ height: `${(day.hours / maxHours) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0D0D0D] px-2 py-1 rounded text-xs whitespace-nowrap">
                    {day.hours}h • {day.cards} cards
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="p-6 rounded-xl bg-[#1A1A1A] border border-[#252525]">
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 text-[#00FF8B]" />
          <h3 className="text-lg font-bold text-white">Conquistas</h3>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300
                ${
                  badge.earned
                    ? "bg-[#00FF8B]/10 border-[#00FF8B]/30 hover:scale-105"
                    : "bg-[#0D0D0D] border-[#252525] opacity-40"
                }
              `}
            >
              <div className="text-3xl">{badge.icon}</div>
              <span className="text-xs text-center font-medium text-gray-300">
                {badge.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Card */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-[#00FF8B]/10 to-[#007B5F]/10 border border-[#00FF8B]/20 text-center">
        <p className="text-lg font-semibold text-white mb-2">
          🎉 Parabéns pela dedicação!
        </p>
        <p className="text-sm text-gray-400">
          Você está no caminho certo. Continue estudando para desbloquear mais
          conquistas!
        </p>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#252525] hover:border-[#00FF8B]/30 transition-all duration-300">
      <Icon className={`w-5 h-5 ${color} mb-2`} />
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
}
