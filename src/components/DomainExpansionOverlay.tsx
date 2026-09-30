import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Flame, X } from "lucide-react";

interface DomainExpansionOverlayProps {
  questTitle: string;
  xpGained: number;
  onDismiss: () => void;
}

export const DomainExpansionOverlay: React.FC<DomainExpansionOverlayProps> = ({
  questTitle,
  xpGained,
  onDismiss,
}) => {
  const [displayXp, setDisplayXp] = useState(0);

  useEffect(() => {
    // Animate XP counter
    let start = 0;
    const duration = 1200;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = xpGained / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= xpGained) {
        setDisplayXp(xpGained);
        clearInterval(timer);
      } else {
        setDisplayXp(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [xpGained]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md overflow-hidden"
        onClick={onDismiss}
      >
        {/* Full screen purple cursed flash shockwave */}
        <motion.div
          initial={{ opacity: 0.9, scale: 0.8 }}
          animate={{ opacity: 0, scale: 2.2 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#E11D48] pointer-events-none"
        />

        {/* Cursed energy spatial vortex rings */}
        <motion.div
          initial={{ rotate: 0, scale: 0.6, opacity: 0 }}
          animate={{ rotate: 360, scale: 1.2, opacity: 0.4 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] rounded-full border border-[#7C3AED]/40 shadow-[0_0_100px_#7C3AED44] pointer-events-none"
        />
        <motion.div
          initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
          animate={{ rotate: -360, scale: 1.5, opacity: 0.2 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] rounded-full border border-[#E11D48]/30 shadow-[0_0_80px_#E11D4833] pointer-events-none"
        />

        {/* Center seal card */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-lg w-full mx-4 p-8 bg-[#14141F] border border-[#7C3AED]/50 rounded-2xl shadow-[0_0_60px_rgba(124,58,237,0.45)] text-center overflow-hidden"
        >
          {/* Subtle top edge glow */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent" />

          {/* Dismiss button */}
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close celebration"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Kicker tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#A855F7] text-xs font-mono tracking-widest uppercase mb-4">
            <Zap className="w-3.5 h-3.5" />
            Curse Suppressed · Exorcism Verified
          </div>

          {/* Large Domain Expansion Header */}
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="font-heading text-4xl sm:text-5xl text-white tracking-wider text-glow-cursed mb-2"
          >
            DOMAIN EXPANSION: MISSION CLEARED
          </motion.h2>

          {/* Quest Title */}
          <p className="text-neutral-300 text-sm sm:text-base font-medium max-w-md mx-auto mb-6 line-clamp-2">
            "{questTitle}"
          </p>

          {/* Big XP Counter */}
          <div className="py-6 px-4 my-2 rounded-xl bg-black/50 border border-white/5 flex flex-col items-center justify-center">
            <div className="text-xs uppercase font-mono tracking-widest text-[#F5B301] flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-[#F5B301]" />
              Cursed Energy Absorbed
            </div>
            <div className="font-heading text-6xl text-[#F5B301] text-glow-gold tracking-tight">
              +{displayXp} <span className="text-2xl text-neutral-400">XP</span>
            </div>
          </div>

          <p className="text-xs text-neutral-400 mt-4 mb-6">
            The mission residue has been cataloged in your Sorcerer Record.
          </p>

          {/* Action button */}
          <button
            onClick={onDismiss}
            className="w-full py-3.5 px-6 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.98] text-white font-heading text-xl tracking-wider transition-all shadow-[0_0_25px_rgba(124,58,237,0.5)] cursor-pointer"
          >
            CONTINUE EXORCISM
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
