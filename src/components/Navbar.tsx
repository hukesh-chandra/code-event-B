import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Flame, Shield, X, Compass, ExternalLink } from "lucide-react";
import { useGame } from "../context/GameContext";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { player, gradeInfo } = useGame();
  const [pairAModalOpen, setPairAModalOpen] = useState(false);
  const [pairATitle, setPairATitle] = useState("");

  const handlePairAClick = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    setPairATitle(title);
    setPairAModalOpen(true);
  };

  const navLinks = [
    { label: "Home", href: "/", isPairA: true },
    { label: "Board", href: "/board", isPairA: true },
    { label: "Missions", href: "/log", isPairA: false },
    { label: "Profile", href: "/profile", isPairA: false },
    { label: "Badges", href: "/badges", isPairA: false },
    { label: "Leaderboard", href: "/leaderboard", isPairA: false },
  ];

  const getGradeBadgeColor = () => {
    switch (gradeInfo.currentGrade) {
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

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0B0B12]/90 backdrop-blur-md border-b border-[#2A2A3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text wordmark */}
          <Link
            to="/log"
            className="text-xl sm:text-2xl font-heading text-white tracking-wider text-glow-cursed hover:text-[#A855F7] transition-colors whitespace-nowrap"
          >
            CU CURSED BOARD
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const isActive = !link.isPairA && location.pathname === link.href;
              if (link.isPairA) {
                return (
                  <button
                    key={link.label}
                    onClick={(e) => handlePairAClick(e, link.label)}
                    className="relative px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer group flex items-center gap-1"
                  >
                    <span>{link.label}</span>
                    <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-neutral-800/80 text-neutral-400 group-hover:text-amber-400 transition-colors border border-neutral-700">
                      Pair A
                    </span>
                  </button>
                );
              }

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-white bg-[#14141F] border border-[#7C3AED]/40 shadow-sm"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Sorcerer Status */}
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14141F] border border-[#2A2A3D] hover:border-[#7C3AED]/50 transition-all group"
            >
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border ${getGradeBadgeColor()}`}>
                  {gradeInfo.currentGrade}
                </span>
                <span className="font-mono text-xs font-semibold text-[#F5B301] tabular-nums">
                  {player.xp.toLocaleString()} XP
                </span>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#7C3AED] cursed-glow hidden sm:block" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-around border-t border-[#2A2A3D]/70 bg-[#0B0B12] px-2 py-2 overflow-x-auto">
          {navLinks.map((link) => {
            const isActive = !link.isPairA && location.pathname === link.href;
            if (link.isPairA) {
              return (
                <button
                  key={link.label}
                  onClick={(e) => handlePairAClick(e, link.label)}
                  className="px-2 py-1 text-[11px] text-neutral-400 whitespace-nowrap flex items-center gap-1"
                >
                  <span>{link.label}</span>
                  <span className="text-[8px] font-mono text-neutral-500">Pair A</span>
                </button>
              );
            }
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap ${
                  isActive ? "text-[#A855F7] font-semibold" : "text-neutral-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Modal for Pair A features */}
      {pairAModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setPairAModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-[#14141F] border border-[#2A2A3D] rounded-2xl p-6 shadow-2xl relative"
          >
            <button
              onClick={() => setPairAModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#F5B301] mb-2">
              <Compass className="w-4 h-4" />
              <span>Campus Catalog & Spatial Map</span>
            </div>
            <h3 className="font-heading text-2xl text-white mb-2">
              {pairATitle} — Coming from Pair A
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed mb-6">
              The public mission catalog and campus interactive map are maintained by Pair A. You are currently viewing the <strong className="text-white">Progression & Mission Tracking Engine (Pair B)</strong>. All accepted missions, checklist verification, leveling, proof uploads, badges, and leaderboard data are live!
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPairAModalOpen(false)}
                className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
              >
                Dismiss
              </button>
              <Link
                to="/log"
                onClick={() => setPairAModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold"
              >
                Open My Missions
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
