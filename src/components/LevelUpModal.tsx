import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, Shield, ChevronRight, X } from "lucide-react";
import { SorcererGrade } from "../types";

interface LevelUpModalProps {
  oldGrade: string;
  newGrade: string;
  onDismiss: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  oldGrade,
  newGrade,
  onDismiss,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        onClick={onDismiss}
      >
        <motion.div
          initial={{ scale: 0.8, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-md w-full bg-[#14141F] border-2 border-[#F5B301]/60 rounded-2xl p-7 text-center shadow-[0_0_80px_rgba(245,179,1,0.35)] overflow-hidden"
        >
          {/* Gold aura glow rays */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#F5B301]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#7C3AED]/30 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Crest icon */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#F5B301]/10 border border-[#F5B301]/40 flex items-center justify-center mb-4 text-[#F5B301] shadow-[0_0_25px_rgba(245,179,1,0.25)]">
            <Crown className="w-8 h-8" />
          </div>

          <div className="text-xs uppercase font-mono tracking-widest text-[#F5B301] mb-1">
            Jujutsu High Promotion Council
          </div>
          <h2 className="font-heading text-4xl text-white tracking-wide text-glow-gold mb-4">
            GRADE ADVANCEMENT!
          </h2>

          <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
            Your mastery over cursed energy has deepened. The Jujutsu High Board officially ratifies your elevation.
          </p>

          {/* Grade transition box */}
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center gap-3 mb-6">
            <span className="font-heading text-lg text-neutral-400 line-through">
              {oldGrade}
            </span>
            <ChevronRight className="w-5 h-5 text-[#F5B301]" />
            <span className="font-heading text-2xl text-[#F5B301] text-glow-gold">
              {newGrade}
            </span>
          </div>

          <div className="space-y-2 text-left bg-[#0B0B12]/80 p-3.5 rounded-lg border border-white/5 text-xs text-neutral-300 mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F5B301]" />
              <span>Higher-grade cursed mission clearance unlocked</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>Enhanced multiplier on builder leaderboard</span>
            </div>
          </div>

          <button
            onClick={onDismiss}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#F5B301] to-[#E11D48] text-black font-heading text-xl tracking-wider font-bold shadow-[0_0_20px_rgba(245,179,1,0.4)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            CLAIM SORCERER CREST
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
