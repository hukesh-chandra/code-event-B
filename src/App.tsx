import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GameProvider, useGame } from "./context/GameContext";
import { Navbar } from "./components/Navbar";
import { LogPage } from "./pages/LogPage";
import { ProfilePage } from "./pages/ProfilePage";
import { BadgesPage } from "./pages/BadgesPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { LandingPage } from "./pages/LandingPage";
import { BoardPage } from "./pages/BoardPage";
import { MapPage } from "./pages/MapPage";
import { QuestDetailPage } from "./pages/QuestDetailPage";
import { DomainExpansionOverlay } from "./components/DomainExpansionOverlay";
import { LevelUpModal } from "./components/LevelUpModal";

const AppContent: React.FC = () => {
  const { celebration, dismissCelebration, levelUpModal, dismissLevelUp } = useGame();

  return (
    <div className="min-h-screen bg-[#0B0B12] text-[#E8E8F0] flex flex-col font-sans selection:bg-[#7C3AED] selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/quest/:id" element={<QuestDetailPage />} />
          <Route path="/log" element={<LogPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/badges" element={<BadgesPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="*" element={<Navigate to="/log" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2A2A3D] bg-[#0B0B12] py-8 text-center text-xs text-neutral-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED] cursed-glow" />
            <span className="text-neutral-300 font-medium">
              CU CURSED MISSION BOARD — Progression Engine
            </span>
          </div>
          <div>
            <span>Chandigarh University Jujutsu High Division · Veil Barrier Active</span>
          </div>
        </div>
      </footer>

      {/* Domain Expansion Mission Cleared Overlay */}
      {celebration && (
        <DomainExpansionOverlay
          questTitle={celebration.questTitle}
          xpGained={celebration.xpGained}
          onDismiss={dismissCelebration}
        />
      )}

      {/* Grade Advancement Level Up Modal */}
      {levelUpModal && (
        <LevelUpModal
          oldGrade={levelUpModal.oldGrade}
          newGrade={levelUpModal.newGrade}
          onDismiss={dismissLevelUp}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </BrowserRouter>
  );
}
