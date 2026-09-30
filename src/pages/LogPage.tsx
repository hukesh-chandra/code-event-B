import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckSquare,
  Square,
  MapPin,
  Sparkles,
  Award,
  ChevronRight,
  ShieldAlert,
  Flame,
  PlusCircle,
  Clock,
  Filter,
  ExternalLink,
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { LOCATIONS } from "../data/locations";
import { QUESTS } from "../data/quests";
import { Quest, QuestCategory } from "../types";
import { CATEGORY_COLORS } from "../utils/progression";
import { GradeProgressBar } from "../components/GradeProgressBar";
import { CursedImage } from "../components/CursedImage";
import { ProofModal } from "../components/ProofModal";

export const LogPage: React.FC = () => {
  const {
    activeQuests,
    questSteps,
    toggleStep,
    completeMission,
    acceptQuest,
    completedQuests,
    runDemoMode,
  } = useGame();

  const [selectedQuestForProof, setSelectedQuestForProof] = useState<Quest | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const locationMap = new Map(LOCATIONS.map((loc) => [loc.id, loc]));

  // Auto-generate 3 steps for a quest
  const getQuestSteps = (quest: Quest) => {
    const loc = locationMap.get(quest.locationId);
    const locName = loc ? loc.name : "Campus Sector";
    return [
      `Deploy veil & scout target perimeter at ${locName}`,
      `Execute ritual objective: ${quest.title}`,
      `Extract verified residue (${
        quest.proofType === "photo"
          ? "Photographic evidence"
          : quest.proofType === "code"
          ? "Algorithmic proof"
          : "Sorcerer honor clearance"
      })`,
    ];
  };

  const filteredQuests =
    categoryFilter === "All"
      ? activeQuests
      : activeQuests.filter((q) => q.category === categoryFilter);

  // Available quests that haven't been accepted or completed yet
  const completedIds = new Set(completedQuests.map((c) => c.id));
  const activeIds = new Set(activeQuests.map((q) => q.id));
  const unacceptedQuests = QUESTS.filter(
    (q) => !completedIds.has(q.id) && !activeIds.has(q.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner / Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2A2A3D] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A855F7] mb-1">
            <Flame className="w-4 h-4 text-[#A855F7]" />
            <span>Active Exorcism Operations</span>
            <span>·</span>
            <span>Jujutsu High Dispatch</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-white tracking-wide">
            MISSION DISPATCH BOARD
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Track and complete your accepted campus missions. Fulfill operational checklist milestones, seal cursed anomalies, and collect bounties.
          </p>
        </div>

        {/* Quick summary stats */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-[#14141F] border border-[#2A2A3D] text-center">
            <span className="text-[10px] font-mono text-neutral-400 uppercase block">Active</span>
            <span className="font-heading text-2xl text-white">{activeQuests.length}</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-[#14141F] border border-[#2A2A3D] text-center">
            <span className="text-[10px] font-mono text-neutral-400 uppercase block">Completed</span>
            <span className="font-heading text-2xl text-[#22C55E]">{completedQuests.length}</span>
          </div>
        </div>
      </div>

      {/* Grade and XP progression bar */}
      <GradeProgressBar />

      {/* Filters and Active missions list */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {["All", "Coding", "Library", "Club", "Wellness", "Workshop", "Secret"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    categoryFilter === cat
                      ? "bg-[#7C3AED] text-white shadow-sm"
                      : "bg-[#14141F] text-neutral-400 hover:text-white border border-[#2A2A3D]"
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          <div className="text-xs text-neutral-400 font-mono">
            Showing {filteredQuests.length} active mission{filteredQuests.length === 1 ? "" : "s"}
          </div>
        </div>

        {/* Mission Cards Grid */}
        {filteredQuests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredQuests.map((quest) => {
              const loc = locationMap.get(quest.locationId);
              const steps = getQuestSteps(quest);
              const questStepStates = questSteps[quest.id] || [false, false, false];
              const completedStepsCount = questStepStates.filter(Boolean).length;
              const progressPct = Math.round((completedStepsCount / 3) * 100);
              const catTheme = CATEGORY_COLORS[quest.category];

              return (
                <div
                  key={quest.id}
                  className="rounded-2xl bg-[#14141F] border border-[#2A2A3D] hover:border-[#7C3AED]/50 transition-all shadow-md overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Photo / Banner with Fallback */}
                    <div className="relative h-44 w-full">
                      <CursedImage
                        src={quest.photo || loc?.photo}
                        alt={quest.title}
                        category={quest.category}
                        caption={loc?.name}
                        className="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14141F] via-[#14141F]/40 to-transparent" />

                      {/* Header Overlays */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border backdrop-blur-md ${catTheme.bg} ${catTheme.text} ${catTheme.border}`}
                        >
                          {quest.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-mono uppercase bg-black/60 backdrop-blur-md text-neutral-300 border border-white/10">
                          {quest.grade}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-black/70 backdrop-blur-md text-[#F5B301] border border-[#F5B301]/30">
                          +{quest.xp} XP
                        </span>
                      </div>

                      {/* Location Badge bottom left of image */}
                      <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-xs text-neutral-200 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
                        <MapPin className="w-3.5 h-3.5 text-[#E11D48]" />
                        <span className="font-medium">{loc?.name || quest.locationId}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-4">
                      <div>
                        <h3 className="font-heading text-2xl text-white tracking-wide hover:text-[#A855F7] transition-colors">
                          {quest.title}
                        </h3>
                        <p className="text-xs text-neutral-300 leading-relaxed mt-1">
                          {quest.description}
                        </p>
                      </div>

                      {/* Bounty Pill */}
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0B0B12] border border-[#2A2A3D] text-xs">
                        <Award className="w-4 h-4 text-[#F5B301] shrink-0" />
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-neutral-400">Bounty:</span>
                          <span className="text-neutral-200 font-medium truncate">{quest.bounty}</span>
                        </div>
                      </div>

                      {/* 3 Checklist Steps with Progress */}
                      <div className="space-y-2.5 pt-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-neutral-400">Ritual Verification</span>
                          <span className="font-mono text-neutral-300 font-medium">
                            {completedStepsCount} / 3 Steps ({progressPct}%)
                          </span>
                        </div>

                        {/* Progress line */}
                        <div className="w-full h-2 bg-[#0B0B12] rounded-full overflow-hidden border border-[#2A2A3D]">
                          <div
                            className="h-full bg-gradient-to-r from-[#7C3AED] to-[#A855F7] transition-all duration-300"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>

                        {/* Interactive checklist items */}
                        <div className="space-y-1.5 pt-1">
                          {steps.map((step, idx) => {
                            const isDone = questStepStates[idx];
                            return (
                              <button
                                key={idx}
                                onClick={() => toggleStep(quest.id, idx)}
                                className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                                  isDone
                                    ? "bg-purple-950/20 text-neutral-300 border border-[#7C3AED]/30"
                                    : "bg-[#0B0B12]/60 text-neutral-400 hover:text-neutral-200 hover:bg-[#0B0B12] border border-white/5"
                                }`}
                              >
                                {isDone ? (
                                  <CheckSquare className="w-4 h-4 text-[#A855F7] shrink-0 mt-0.5" />
                                ) : (
                                  <Square className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                                )}
                                <span className={isDone ? "line-through opacity-80" : ""}>
                                  {step}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action footer */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => setSelectedQuestForProof(quest)}
                      className="w-full py-3 px-4 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.99] text-white font-heading text-lg tracking-wider transition-all shadow-[0_0_20px_rgba(124,58,237,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>COMPLETE MISSION</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#14141F] border border-[#2A2A3D] space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-950/30 border border-[#7C3AED]/30 flex items-center justify-center text-[#A855F7]">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-2xl text-white">NO ACTIVE MISSIONS IN THIS SECTOR</h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto">
              You have resolved all assigned veils in this category. Accept fresh missions from the dispatch pool below or run Demo Mode to fast-track progression.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setCategoryFilter("All")}
                className="px-4 py-2 rounded-lg bg-[#2A2A3D] hover:bg-neutral-700 text-white text-xs font-medium cursor-pointer"
              >
                Reset Filter
              </button>
              <button
                onClick={() => runDemoMode()}
                className="px-4 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-medium cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fast-Forward (Demo Mode)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Available Missions Dispatch Pool (if unaccepted quests exist) */}
      {unacceptedQuests.length > 0 && (
        <div className="pt-8 border-t border-[#2A2A3D] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase text-[#F5B301] tracking-wider mb-1">
                Jujutsu High Dispatch Pool
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl text-white">
                ACCEPT MORE MISSIONS
              </h2>
            </div>
            <span className="text-xs text-neutral-400 font-mono">
              {unacceptedQuests.length} Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unacceptedQuests.slice(0, 6).map((quest) => {
              const loc = locationMap.get(quest.locationId);
              const catTheme = CATEGORY_COLORS[quest.category];

              return (
                <div
                  key={quest.id}
                  className="p-4 rounded-xl bg-[#14141F] border border-[#2A2A3D] hover:border-[#7C3AED]/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${catTheme.bg} ${catTheme.text} ${catTheme.border}`}
                      >
                        {quest.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#F5B301]">
                        +{quest.xp} XP
                      </span>
                    </div>

                    <h4 className="font-heading text-lg text-white line-clamp-1">
                      {quest.title}
                    </h4>

                    <p className="text-xs text-neutral-400 line-clamp-2">
                      {quest.description}
                    </p>

                    <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                      <MapPin className="w-3 h-3 text-[#E11D48]" />
                      <span className="truncate">{loc?.name || quest.locationId}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => acceptQuest(quest.id)}
                    className="mt-4 w-full py-2 px-3 rounded-lg bg-[#0B0B12] hover:bg-[#7C3AED] hover:text-white text-neutral-200 border border-[#2A2A3D] hover:border-[#7C3AED] text-xs font-medium font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Accept Mission</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Proof Submission Modal */}
      <ProofModal
        quest={selectedQuestForProof}
        onClose={() => setSelectedQuestForProof(null)}
        onSubmit={(questId, proof) => {
          setSelectedQuestForProof(null);
          completeMission(questId, proof);
        }}
      />
    </div>
  );
};
