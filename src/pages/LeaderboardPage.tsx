import React, { useState, useMemo } from "react";
import {
  Trophy,
  Crown,
  Medal,
  Flame,
  Sparkles,
  ArrowUp,
  User,
  Shield,
  Search,
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { SEEDED_SORCERERS, LeaderboardEntry } from "../data/leaderboardData";
import { SorcererGrade } from "../types";

export const LeaderboardPage: React.FC = () => {
  const { player, gradeInfo, completedQuests } = useGame();
  const [activeTab, setActiveTab] = useState<"allTime" | "thisWeek">("allTime");
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate current player's this-week XP
  const playerThisWeekXp = useMemo(() => {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    // Estimate or calculate from completed quests timestamps
    const recentXp = completedQuests
      .filter((q) => new Date(q.completedAt).getTime() > oneWeekAgo)
      .length * 250;
    // Or at least baseline portion of total XP
    return Math.max(recentXp, Math.min(player.xp, Math.round(player.xp * 0.45)));
  }, [completedQuests, player.xp]);

  // Combine seeded sorcerers with the active player
  const leaderboardList = useMemo(() => {
    const playerEntry: LeaderboardEntry = {
      id: "current-player",
      name: `${player.name} (You)`,
      department: "CU Jujutsu High",
      grade: gradeInfo.currentGrade,
      allTimeXp: player.xp,
      thisWeekXp: playerThisWeekXp,
      avatarSeed: "player",
      bountiesClaimed: completedQuests.length,
    };

    const combined = [...SEEDED_SORCERERS, playerEntry];

    // Sort descending by selected tab XP
    combined.sort((a, b) => {
      const xpA = activeTab === "allTime" ? a.allTimeXp : a.thisWeekXp;
      const xpB = activeTab === "allTime" ? b.allTimeXp : b.thisWeekXp;
      return xpB - xpA;
    });

    return combined;
  }, [player.name, player.xp, gradeInfo.currentGrade, playerThisWeekXp, completedQuests.length, activeTab]);

  // Find player rank in sorted list
  const playerRank = leaderboardList.findIndex((item) => item.id === "current-player") + 1;

  // Filtered by search if any
  const filteredList = useMemo(() => {
    if (!searchQuery.trim()) return leaderboardList;
    const q = searchQuery.toLowerCase();
    return leaderboardList.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.department.toLowerCase().includes(q) ||
        item.grade.toLowerCase().includes(q)
    );
  }, [leaderboardList, searchQuery]);

  const getGradeColor = (grade: SorcererGrade) => {
    switch (grade) {
      case "Special Grade":
        return "text-[#F5B301] border-[#F5B301]/40 bg-[#F5B301]/10";
      case "Grade 1":
        return "text-[#E11D48] border-[#E11D48]/40 bg-[#E11D48]/10";
      case "Grade 2":
        return "text-[#7C3AED] border-[#7C3AED]/40 bg-[#7C3AED]/10";
      case "Grade 3":
        return "text-[#3B82F6] border-[#3B82F6]/40 bg-[#3B82F6]/10";
      default:
        return "text-neutral-300 border-neutral-700 bg-neutral-800/40";
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-8 h-8 rounded-full bg-[#F5B301]/20 border border-[#F5B301] flex items-center justify-center text-[#F5B301] font-bold">
          <Crown className="w-4 h-4" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-8 h-8 rounded-full bg-slate-300/20 border border-slate-300 flex items-center justify-center text-slate-200 font-bold">
          2
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-700/20 border border-amber-600 flex items-center justify-center text-amber-500 font-bold">
          3
        </div>
      );
    }
    return (
      <span className="w-8 text-center font-mono text-sm text-neutral-400 font-medium">
        #{rank}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2A2A3D] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F5B301] mb-1">
            <Trophy className="w-4 h-4 text-[#F5B301]" />
            <span>Campus Leaderboard</span>
            <span>·</span>
            <span>Live Sorcerer Standings</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-white tracking-wide">
            BUILDER & SORCERER LADDER
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Real-time rankings of Chandigarh University student sorcerers by accumulated cursed energy XP and completed campus bounties.
          </p>
        </div>

        {/* Current Player Rank Banner */}
        <div className="p-4 rounded-2xl bg-[#14141F] border border-[#7C3AED]/50 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-[#A855F7]">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase block">
              Your Campus Standing
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-2xl text-white">
                Rank #{playerRank}
              </span>
              <span className="text-xs font-mono text-[#F5B301]">
                ({(activeTab === "allTime" ? player.xp : playerThisWeekXp).toLocaleString()} XP)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 bg-[#14141F] rounded-xl border border-[#2A2A3D] self-start">
          <button
            onClick={() => setActiveTab("allTime")}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === "allTime"
                ? "bg-[#7C3AED] text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            All-Time Exorcisms
          </button>
          <button
            onClick={() => setActiveTab("thisWeek")}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === "thisWeek"
                ? "bg-[#7C3AED] text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            This Week's Surge
          </button>
        </div>

        {/* Search input */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sorcerer, block, or grade..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#14141F] border border-[#2A2A3D] text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#7C3AED]"
          />
        </div>
      </div>

      {/* Leaderboard Table Container */}
      <div className="rounded-2xl bg-[#14141F] border border-[#2A2A3D] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2A2A3D] bg-[#0B0B12]/80 text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                <th className="py-4 px-4 sm:px-6 w-16 text-center">Rank</th>
                <th className="py-4 px-4 sm:px-6">Sorcerer</th>
                <th className="py-4 px-4 sm:px-6 hidden md:table-cell">Department / Sector</th>
                <th className="py-4 px-4 sm:px-6">Grade</th>
                <th className="py-4 px-4 sm:px-6 text-center hidden sm:table-cell">Bounties</th>
                <th className="py-4 px-4 sm:px-6 text-right">
                  {activeTab === "allTime" ? "All-Time XP" : "Weekly XP"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A3D]/50 text-sm">
              {filteredList.map((entry) => {
                const isCurrentPlayer = entry.id === "current-player";
                // find original overall index before filtering for true rank
                const originalRank = leaderboardList.findIndex((item) => item.id === entry.id) + 1;
                const scoreXp = activeTab === "allTime" ? entry.allTimeXp : entry.thisWeekXp;

                return (
                  <tr
                    key={entry.id}
                    className={`transition-colors ${
                      isCurrentPlayer
                        ? "bg-[#7C3AED]/15 border-l-4 border-l-[#7C3AED] hover:bg-[#7C3AED]/20 font-medium"
                        : "hover:bg-white/[0.02]"
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-4 px-4 sm:px-6 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        {getRankBadge(originalRank)}
                      </div>
                    </td>

                    {/* Sorcerer Name & Status */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-mono font-bold ${
                            isCurrentPlayer
                              ? "bg-[#7C3AED] text-white shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                              : "bg-[#0B0B12] border border-[#2A2A3D] text-neutral-300"
                          }`}
                        >
                          {entry.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-heading text-lg text-white tracking-wide">
                              {entry.name}
                            </span>
                            {isCurrentPlayer && (
                              <span className="text-[10px] font-mono uppercase px-2 py-0.2 rounded-full bg-[#7C3AED] text-white font-bold">
                                YOU
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-neutral-400 md:hidden block">
                            {entry.department}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Department / Sector */}
                    <td className="py-4 px-4 sm:px-6 text-xs text-neutral-300 hidden md:table-cell whitespace-nowrap">
                      {entry.department}
                    </td>

                    {/* Grade */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${getGradeColor(
                          entry.grade
                        )}`}
                      >
                        {entry.grade}
                      </span>
                    </td>

                    {/* Bounties Count */}
                    <td className="py-4 px-4 sm:px-6 text-center font-mono text-xs text-neutral-300 hidden sm:table-cell whitespace-nowrap">
                      {entry.bountiesClaimed}
                    </td>

                    {/* XP Score */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap font-mono">
                      <span className="font-heading text-xl text-[#F5B301] text-glow-gold">
                        {scoreXp.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-500 ml-1">XP</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
