import React, { useState } from "react";
import {
  Award,
  Lock,
  CheckCircle2,
  Swords,
  BookOpen,
  Terminal,
  Users,
  Flame,
  ShieldAlert,
  Eye,
  Key,
  Coffee,
  Compass,
  Crown,
  Sparkles,
  Filter,
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { UnlockedBadgeState } from "../utils/progression";

export const BadgesPage: React.FC = () => {
  const { badges, unlockedBadgesCount } = useGame();
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Swords":
        return Swords;
      case "BookOpen":
        return BookOpen;
      case "Terminal":
        return Terminal;
      case "Users":
        return Users;
      case "Flame":
        return Flame;
      case "ShieldAlert":
        return ShieldAlert;
      case "Eye":
        return Eye;
      case "Key":
        return Key;
      case "Coffee":
        return Coffee;
      case "Compass":
        return Compass;
      case "Award":
        return Award;
      case "Crown":
        return Crown;
      default:
        return Sparkles;
    }
  };

  const filteredBadges = badges.filter((b) => {
    if (filter === "unlocked") return b.unlocked;
    if (filter === "locked") return !b.unlocked;
    return true;
  });

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case "Special Grade":
        return "text-[#F5B301] border-[#F5B301]/40 bg-[#F5B301]/10";
      case "Rare":
        return "text-[#A855F7] border-[#A855F7]/40 bg-[#A855F7]/10";
      default:
        return "text-neutral-400 border-neutral-700 bg-neutral-800/40";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2A2A3D] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F5B301] mb-1">
            <Sparkles className="w-4 h-4 text-[#F5B301]" />
            <span>Sorcerer Seals of Merit</span>
            <span>·</span>
            <span>12 Core Trophies</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-white tracking-wide">
            ACHIEVEMENTS & SEALS
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Trophy seals forged by the Jujutsu High Faculty upon conquering designated campus feats, locations, and cursed ranks.
          </p>
        </div>

        {/* Unlocked count pill */}
        <div className="flex items-center gap-3">
          <div className="px-5 py-3 rounded-2xl bg-[#14141F] border border-[#2A2A3D] flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-[#A855F7]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                Total Unlocked
              </span>
              <span className="font-heading text-2xl text-white">
                {unlockedBadgesCount} <span className="text-sm text-neutral-500">/ 12</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-[#14141F] rounded-xl border border-[#2A2A3D]">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filter === "all"
                ? "bg-[#7C3AED] text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            All Seals (12)
          </button>
          <button
            onClick={() => setFilter("unlocked")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filter === "unlocked"
                ? "bg-[#7C3AED] text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Unlocked ({unlockedBadgesCount})
          </button>
          <button
            onClick={() => setFilter("locked")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filter === "locked"
                ? "bg-[#7C3AED] text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Locked ({12 - unlockedBadgesCount})
          </button>
        </div>

        <span className="text-xs font-mono text-neutral-400 hidden sm:block">
          {Math.round((unlockedBadgesCount / 12) * 100)}% Complete
        </span>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBadges.map(({ badge, unlocked, progressText, percent }) => {
          const IconComp = getIcon(badge.icon);

          return (
            <div
              key={badge.id}
              className={`rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                unlocked
                  ? "bg-[#14141F] border-[#7C3AED]/50 shadow-[0_0_25px_rgba(124,58,237,0.15)] hover:border-[#7C3AED]"
                  : "bg-[#101018]/80 border-[#2A2A3D]/70 opacity-75 hover:opacity-100"
              }`}
            >
              {/* Unlocked top glow effect */}
              {unlocked && (
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent" />
              )}

              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                      unlocked
                        ? "bg-gradient-to-br from-[#7C3AED]/30 via-[#14141F] to-[#0B0B12] border-[#7C3AED] text-[#F5B301] shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                        : "bg-[#0B0B12] border-[#2A2A3D] text-neutral-600"
                    }`}
                  >
                    <IconComp className="w-7 h-7" />
                  </div>

                  {/* Status & Rarity */}
                  <div className="flex flex-col items-end gap-1.5">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${getRarityBadge(
                        badge.rarity
                      )}`}
                    >
                      {badge.rarity}
                    </span>
                    {unlocked ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-[#22C55E]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>UNLOCKED</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-neutral-500">
                        <Lock className="w-3 h-3" />
                        <span>LOCKED</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Badge title & description */}
                <h3
                  className={`font-heading text-2xl tracking-wide mb-1 ${
                    unlocked ? "text-white text-glow-cursed" : "text-neutral-400"
                  }`}
                >
                  {badge.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {badge.description}
                </p>
              </div>

              {/* Progress Bar / Completed status */}
              <div className="pt-3 border-t border-[#2A2A3D]/60 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-500">Progress</span>
                  <span className={unlocked ? "text-[#F5B301] font-semibold" : "text-neutral-400"}>
                    {unlocked ? "Complete" : progressText}
                  </span>
                </div>

                <div className="w-full h-1.5 bg-[#0B0B12] rounded-full overflow-hidden border border-white/5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      unlocked
                        ? "bg-gradient-to-r from-[#7C3AED] to-[#F5B301]"
                        : "bg-neutral-700"
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
