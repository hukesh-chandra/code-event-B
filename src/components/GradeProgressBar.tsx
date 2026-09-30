import React from "react";
import { Sparkles, Shield, ChevronRight, Award } from "lucide-react";
import { useGame } from "../context/GameContext";

interface GradeProgressBarProps {
  className?: string;
  showDetails?: boolean;
}

export const GradeProgressBar: React.FC<GradeProgressBarProps> = ({
  className = "",
  showDetails = true,
}) => {
  const { player, gradeInfo } = useGame();

  const getGradeColor = (grade: string) => {
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

  const xpRemaining = gradeInfo.nextXp ? Math.max(0, gradeInfo.nextXp - player.xp) : 0;

  return (
    <div
      className={`p-5 rounded-2xl bg-[#14141F] border border-[#2A2A3D] shadow-lg relative overflow-hidden ${className}`}
    >
      {/* Background cursed energy ambient aura */}
      <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-l from-[#7C3AED]/15 to-transparent pointer-events-none blur-2xl" />

      {/* Header with grades */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
              Sorcerer Rank
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`font-heading text-2xl tracking-wider px-2.5 py-0.5 rounded-lg border ${getGradeColor(
                  gradeInfo.currentGrade
                )}`}
              >
                {gradeInfo.currentGrade}
              </span>
              {gradeInfo.nextGrade && (
                <>
                  <ChevronRight className="w-4 h-4 text-neutral-500 shrink-0" />
                  <span className="text-xs font-mono text-neutral-400">
                    Next: <strong className="text-neutral-200">{gradeInfo.nextGrade}</strong>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* XP stats readout */}
        <div className="flex items-baseline gap-2 sm:text-right font-mono">
          <span className="font-heading text-3xl text-[#F5B301] tabular-nums text-glow-gold">
            {player.xp.toLocaleString()}
          </span>
          {gradeInfo.nextXp ? (
            <span className="text-xs text-neutral-400">
              / {gradeInfo.nextXp.toLocaleString()} XP
            </span>
          ) : (
            <span className="text-xs text-[#F5B301] uppercase tracking-wider font-semibold">
              (Apex Form)
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative w-full h-3.5 bg-[#0B0B12] rounded-full overflow-hidden border border-[#2A2A3D] my-2">
        <div
          className="h-full bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#F5B301] rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(124,58,237,0.7)]"
          style={{ width: `${gradeInfo.progressPercent}%` }}
        />
      </div>

      {/* Footer details */}
      {showDetails && (
        <div className="flex items-center justify-between text-xs text-neutral-400 mt-2 font-mono">
          <span>{gradeInfo.progressPercent}% to next clearance</span>
          {gradeInfo.nextGrade ? (
            <span className="text-[#F5B301]">
              {xpRemaining.toLocaleString()} XP until promotion
            </span>
          ) : (
            <span className="text-[#F5B301]">Maximum Jujutsu High Clearance</span>
          )}
        </div>
      )}
    </div>
  );
};
