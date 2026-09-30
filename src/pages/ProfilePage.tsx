import React, { useState } from "react";
import {
  User,
  Edit2,
  Check,
  RotateCcw,
  Sparkles,
  MapPin,
  Flame,
  Award,
  Calendar,
  ExternalLink,
  Shield,
  Eye,
  X,
  AlertTriangle,
  Compass,
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { LOCATIONS } from "../data/locations";
import { QUESTS } from "../data/quests";
import { GradeProgressBar } from "../components/GradeProgressBar";
import { CursedImage } from "../components/CursedImage";
import { CATEGORY_COLORS } from "../utils/progression";

export const ProfilePage: React.FC = () => {
  const {
    player,
    updatePlayerName,
    gradeInfo,
    completedQuests,
    streakDays,
    runDemoMode,
    resetProgress,
    unlockedBadgesCount,
  } = useGame();

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(player.name);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);
  const [selectedProofModal, setSelectedProofModal] = useState<{
    title: string;
    proof?: string;
    completedAt: string;
    locationName: string;
  } | null>(null);

  const locationMap = new Map(LOCATIONS.map((loc) => [loc.id, loc]));
  const questMap = new Map(QUESTS.map((q) => [q.id, q]));

  // Count unique explored locations
  const completedFullQuests = completedQuests
    .map((c) => questMap.get(c.id))
    .filter((q) => q !== undefined);
  const uniqueLocationsExplored = new Set(completedFullQuests.map((q) => q.locationId)).size;
  const totalLocationsCount = LOCATIONS.length;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlayerName(nameInput);
    setIsEditingName(false);
  };

  const handleRunDemo = () => {
    const res = runDemoMode();
    setDemoNotice(
      `Accelerated! +600 XP granted & ${res.addedQuestsCount} missions dispatched to /log.`
    );
    setTimeout(() => setDemoNotice(null), 4000);
  };

  const handleConfirmReset = () => {
    resetProgress();
    setResetConfirmOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner & Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2A2A3D] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F5B301] mb-1">
            <Shield className="w-4 h-4 text-[#F5B301]" />
            <span>Official Jujutsu High Dossier</span>
            <span>·</span>
            <span>ID #CU-7749</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-white tracking-wide">
            SORCERER PROFILE & REGISTRY
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Sorcerer credentials, verified field achievements, and territory cleansing archives at Chandigarh University.
          </p>
        </div>

        {/* Action buttons: Demo mode & Reset */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleRunDemo}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:brightness-110 active:scale-95 text-white text-xs font-mono font-semibold tracking-wider transition-all shadow-[0_0_15px_rgba(124,58,237,0.4)] flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5B301]" />
            <span>DEV DEMO MODE (+600 XP & 3 Quests)</span>
          </button>

          <button
            onClick={() => setResetConfirmOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#14141F] hover:bg-rose-950/40 text-neutral-400 hover:text-rose-300 border border-[#2A2A3D] hover:border-rose-900/60 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>
        </div>
      </div>

      {demoNotice && (
        <div className="p-3.5 rounded-xl bg-purple-950/40 border border-[#7C3AED]/50 text-[#E8E8F0] text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F5B301]" />
            <span>{demoNotice}</span>
          </div>
          <button
            onClick={() => setDemoNotice(null)}
            className="text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Sorcerer ID Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: ID Badge & Name Card */}
        <div className="lg:col-span-1 rounded-2xl bg-[#14141F] border border-[#2A2A3D] p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/10 rounded-bl-full pointer-events-none" />

          <div className="space-y-6">
            {/* Avatar & Talisman Seal */}
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#7C3AED] via-[#14141F] to-[#0B0B12] border-2 border-[#7C3AED]/60 p-1 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                <User className="w-10 h-10 text-neutral-200" />
                <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#0B0B12] border border-[#7C3AED] text-[#F5B301]">
                  <Sparkles className="w-3 h-3" />
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A855F7] block">
                  Chandigarh University
                </span>
                {isEditingName ? (
                  <form onSubmit={handleSaveName} className="flex items-center gap-1.5 mt-1">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="px-2 py-1 rounded bg-[#0B0B12] border border-[#7C3AED] text-white text-sm font-semibold focus:outline-none w-36"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="p-1 rounded bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center gap-2 mt-0.5">
                    <h2 className="font-heading text-2xl text-white tracking-wide">
                      {player.name}
                    </h2>
                    <button
                      onClick={() => {
                        setNameInput(player.name);
                        setIsEditingName(true);
                      }}
                      className="p-1 text-neutral-400 hover:text-white rounded hover:bg-white/5 transition-colors"
                      title="Edit sorcerer name"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <span className="text-xs text-neutral-400 font-mono">
                  Grade Level: <strong className="text-white">{gradeInfo.currentGrade}</strong>
                </span>
              </div>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#0B0B12] border border-[#2A2A3D]">
                <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] font-mono uppercase">
                  <Flame className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>Streak</span>
                </div>
                <div className="font-heading text-2xl text-white mt-1">
                  {streakDays} <span className="text-xs text-neutral-400 font-mono">DAYS</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0B12] border border-[#2A2A3D]">
                <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] font-mono uppercase">
                  <Award className="w-3.5 h-3.5 text-[#F5B301]" />
                  <span>Exorcisms</span>
                </div>
                <div className="font-heading text-2xl text-[#22C55E] mt-1">
                  {completedQuests.length}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0B12] border border-[#2A2A3D]">
                <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] font-mono uppercase">
                  <Compass className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Explored</span>
                </div>
                <div className="font-heading text-2xl text-white mt-1">
                  {uniqueLocationsExplored}
                  <span className="text-xs text-neutral-400 font-mono">
                    /{totalLocationsCount}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0B12] border border-[#2A2A3D]">
                <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] font-mono uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
                  <span>Badges</span>
                </div>
                <div className="font-heading text-2xl text-[#A855F7] mt-1">
                  {unlockedBadgesCount}
                  <span className="text-xs text-neutral-400 font-mono">/12</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#2A2A3D] text-[11px] font-mono text-neutral-500 flex items-center justify-between">
            <span>AFFILIATION: CU JUJUTSU HIGH</span>
            <span>BARRIER: STABLE</span>
          </div>
        </div>

        {/* Right Column: Leveling & Territory Exploration Progress */}
        <div className="lg:col-span-2 space-y-6">
          <GradeProgressBar />

          {/* Places Explored Overview */}
          <div className="p-6 rounded-2xl bg-[#14141F] border border-[#2A2A3D] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#14B8A6]">
                  Campus Spatial Exploration
                </span>
                <h3 className="font-heading text-2xl text-white tracking-wide">
                  TERRITORY PURIFICATION: {uniqueLocationsExplored} / {totalLocationsCount} SECTORS
                </h3>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                {Math.round((uniqueLocationsExplored / totalLocationsCount) * 100)}% Cleansed
              </span>
            </div>

            {/* Micro grid of campus sectors */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-2">
              {LOCATIONS.map((loc) => {
                const isCleared = completedFullQuests.some((q) => q.locationId === loc.id);
                return (
                  <div
                    key={loc.id}
                    title={`${loc.name} (${loc.type}) - ${isCleared ? "Cleared" : "Uncleared"}`}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      isCleared
                        ? "bg-purple-950/20 border-[#7C3AED]/40 text-[#A855F7]"
                        : "bg-[#0B0B12] border-white/5 text-neutral-500"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase block truncate">
                      {loc.name}
                    </span>
                    <span className="text-[9px] block opacity-75">
                      {isCleared ? "PURGED" : "PENDING"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Completed Mission History with Proof Thumbnails */}
      <div className="space-y-4 pt-4 border-t border-[#2A2A3D]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-[#22C55E] tracking-wider mb-1">
              Archived Exorcism Records
            </div>
            <h2 className="font-heading text-3xl text-white">
              COMPLETED MISSION HISTORY ({completedQuests.length})
            </h2>
          </div>
        </div>

        {completedQuests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {completedQuests.map((record, index) => {
              const quest = questMap.get(record.id);
              const loc = quest ? locationMap.get(quest.locationId) : null;
              const catTheme = quest ? CATEGORY_COLORS[quest.category] : null;

              return (
                <div
                  key={`${record.id}-${index}`}
                  className="rounded-xl bg-[#14141F] border border-[#2A2A3D] overflow-hidden flex flex-col justify-between hover:border-[#7C3AED]/40 transition-colors"
                >
                  <div>
                    {/* Proof thumbnail / location fallback */}
                    <div className="relative h-36 w-full bg-[#0B0B12]">
                      {record.proof && record.proof.startsWith("data:image") ? (
                        <img
                          src={record.proof}
                          alt="Proof residue"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <CursedImage
                          src={quest?.photo || loc?.photo}
                          alt={quest?.title || "Exorcised Mission"}
                          category={quest?.category}
                          caption={loc?.name}
                          className="w-full h-full"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14141F] via-transparent to-black/30" />

                      {quest && catTheme && (
                        <div className="absolute top-2.5 left-2.5">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded border backdrop-blur-md ${catTheme.bg} ${catTheme.text} ${catTheme.border}`}
                          >
                            {quest.category}
                          </span>
                        </div>
                      )}

                      <div className="absolute top-2.5 right-2.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#F5B301] border border-[#F5B301]/30">
                          +{quest?.xp || 0} XP
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-heading text-lg text-white line-clamp-1">
                        {quest?.title || "Exorcised Curse"}
                      </h4>

                      <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <MapPin className="w-3.5 h-3.5 text-[#E11D48]" />
                        <span>{loc?.name || quest?.locationId || "Campus"}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 pt-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(record.completedAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Proof inspector button */}
                  <div className="p-4 pt-0">
                    <button
                      onClick={() =>
                        setSelectedProofModal({
                          title: quest?.title || "Mission Proof",
                          proof: record.proof,
                          completedAt: record.completedAt,
                          locationName: loc?.name || "Campus",
                        })
                      }
                      className="w-full py-2 px-3 rounded-lg bg-[#0B0B12] hover:bg-[#7C3AED]/20 text-xs font-mono text-neutral-300 hover:text-white border border-[#2A2A3D] hover:border-[#7C3AED]/50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#7C3AED]" />
                      <span>Inspect Exorcism Proof</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-[#14141F] border border-[#2A2A3D] text-neutral-400 space-y-2">
            <p className="text-sm">No missions completed yet.</p>
            <p className="text-xs text-neutral-500">
              Visit the <strong className="text-neutral-300">My Missions</strong> tab to exorcise your first campus curse!
            </p>
          </div>
        )}
      </div>

      {/* Proof Inspection Modal */}
      {selectedProofModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={() => setSelectedProofModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full bg-[#14141F] border border-[#2A2A3D] rounded-2xl p-6 shadow-2xl relative space-y-4"
          >
            <button
              onClick={() => setSelectedProofModal(null)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#7C3AED]">
                Archived Residue Verification
              </span>
              <h3 className="font-heading text-2xl text-white">
                {selectedProofModal.title}
              </h3>
              <div className="text-xs text-neutral-400 flex items-center gap-2">
                <span>{selectedProofModal.locationName}</span>
                <span>·</span>
                <span>{new Date(selectedProofModal.completedAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="border border-[#2A2A3D] rounded-xl overflow-hidden bg-[#0B0B12] p-2">
              {selectedProofModal.proof ? (
                selectedProofModal.proof.startsWith("data:image") ? (
                  <img
                    src={selectedProofModal.proof}
                    alt="Submitted proof residue"
                    className="w-full max-h-72 object-contain rounded-lg mx-auto"
                  />
                ) : (
                  <pre className="p-3 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                    {selectedProofModal.proof}
                  </pre>
                )
              ) : (
                <div className="p-8 text-center text-xs text-neutral-400">
                  <Shield className="w-8 h-8 text-[#A855F7] mx-auto mb-2 opacity-60" />
                  Verified via Sorcerer Honor Clearance. No additional digital payload required.
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedProofModal(null)}
                className="px-4 py-2 rounded-lg bg-[#2A2A3D] hover:bg-neutral-700 text-white text-xs font-medium cursor-pointer"
              >
                Close Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {resetConfirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={() => setResetConfirmOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-[#14141F] border border-rose-900/60 rounded-2xl p-6 shadow-2xl relative space-y-4"
          >
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2.5 rounded-xl bg-rose-950/50 border border-rose-800">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading text-2xl text-white">RESET PROGRESS?</h3>
                <span className="text-xs text-neutral-400 font-mono">Irreversible Ritual</span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              This will reset your XP back to 0 (Grade 4), purge all completed mission proofs, and reset your active missions back to default.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold font-mono tracking-wider cursor-pointer"
              >
                CONFIRM PURGE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
