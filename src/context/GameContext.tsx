import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { PlayerData, CompletedQuestRecord, Quest } from "../types";
import { QUESTS } from "../data/quests";
import {
  getStoredPlayer,
  setStoredPlayer,
  getStoredAcceptedQuestIds,
  setStoredAcceptedQuestIds,
  getStoredCompletedQuests,
  setStoredCompletedQuests,
  getStoredQuestSteps,
  setStoredQuestStep,
  triggerDemoMode as execDemoMode,
  resetAllProgress as execResetProgress,
} from "../utils/storage";
import { getGradeInfo, evaluateBadges, GradeInfo, UnlockedBadgeState } from "../utils/progression";

interface CelebrationState {
  questTitle: string;
  xpGained: number;
}

interface LevelUpState {
  oldGrade: string;
  newGrade: string;
}

interface GameContextType {
  player: PlayerData;
  acceptedQuestIds: string[];
  completedQuests: CompletedQuestRecord[];
  questSteps: Record<string, boolean[]>;
  activeQuests: Quest[];
  gradeInfo: GradeInfo;
  badges: UnlockedBadgeState[];
  unlockedBadgesCount: number;
  celebration: CelebrationState | null;
  levelUpModal: LevelUpState | null;
  updatePlayerName: (newName: string) => void;
  toggleStep: (questId: string, stepIndex: number) => void;
  completeMission: (questId: string, proof?: string) => void;
  acceptQuest: (questId: string) => void;
  runDemoMode: () => { addedQuestsCount: number; newXp: number };
  resetProgress: () => void;
  dismissCelebration: () => void;
  dismissLevelUp: () => void;
  streakDays: number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<PlayerData>(getStoredPlayer);
  const [acceptedQuestIds, setAcceptedQuestIds] = useState<string[]>(getStoredAcceptedQuestIds);
  const [completedQuests, setCompletedQuests] = useState<CompletedQuestRecord[]>(getStoredCompletedQuests);
  const [questSteps, setQuestSteps] = useState<Record<string, boolean[]>>(getStoredQuestSteps);
  const [celebration, setCelebration] = useState<CelebrationState | null>(null);
  const [levelUpModal, setLevelUpModal] = useState<LevelUpState | null>(null);

  useEffect(() => {
    const syncSharedStorage = () => {
      setPlayer(getStoredPlayer());
      setAcceptedQuestIds(getStoredAcceptedQuestIds());
      setCompletedQuests(getStoredCompletedQuests());
    };
    window.addEventListener("cu_storage_update", syncSharedStorage);
    window.addEventListener("storage", syncSharedStorage);
    return () => {
      window.removeEventListener("cu_storage_update", syncSharedStorage);
      window.removeEventListener("storage", syncSharedStorage);
    };
  }, []);

  // Sync state whenever player or storage changes
  const gradeInfo = useMemo(() => getGradeInfo(player.xp), [player.xp]);

  const activeQuests = useMemo(() => {
    const completedSet = new Set(completedQuests.map((c) => c.id));
    const questMap = new Map<string, Quest>(QUESTS.map((q) => [q.id, q]));
    return acceptedQuestIds
      .filter((id) => !completedSet.has(id))
      .map((id) => questMap.get(id))
      .filter((q): q is Quest => q !== undefined);
  }, [acceptedQuestIds, completedQuests]);

  const badges = useMemo(() => {
    return evaluateBadges(completedQuests, player.xp, QUESTS);
  }, [completedQuests, player.xp]);

  const unlockedBadgesCount = useMemo(() => {
    return badges.filter((b) => b.unlocked).length;
  }, [badges]);

  // Streak: calculated based on completions count plus baseline
  const streakDays = useMemo(() => {
    return Math.max(1, Math.min(30, completedQuests.length * 2 + 1));
  }, [completedQuests]);

  const updatePlayerName = useCallback((newName: string) => {
    const trimmed = newName.trim() || "Sorcerer";
    const updated = { ...player, name: trimmed };
    setPlayer(updated);
    setStoredPlayer(updated);
  }, [player]);

  const toggleStep = useCallback((questId: string, stepIndex: number) => {
    const currentSteps = questSteps[questId] ? [...questSteps[questId]] : [false, false, false];
    const nextVal = !currentSteps[stepIndex];
    const updated = setStoredQuestStep(questId, stepIndex, nextVal);
    setQuestSteps({ ...updated });
  }, [questSteps]);

  const acceptQuest = useCallback((questId: string) => {
    if (acceptedQuestIds.includes(questId)) return;
    const next = [...acceptedQuestIds, questId];
    setAcceptedQuestIds(next);
    setStoredAcceptedQuestIds(next);
  }, [acceptedQuestIds]);

  const completeMission = useCallback((questId: string, proof?: string) => {
    const quest = QUESTS.find((q) => q.id === questId);
    if (!quest) return;

    const oldGrade = getGradeInfo(player.xp).currentGrade;
    const newXp = player.xp + quest.xp;
    const newGrade = getGradeInfo(newXp).currentGrade;

    const newRecord: CompletedQuestRecord = {
      id: questId,
      proof,
      completedAt: new Date().toISOString(),
    };

    const nextCompleted = [newRecord, ...completedQuests];
    const nextAccepted = acceptedQuestIds.filter((id) => id !== questId);
    const nextPlayer: PlayerData = {
      ...player,
      xp: newXp,
    };

    setStoredCompletedQuests(nextCompleted);
    setStoredAcceptedQuestIds(nextAccepted);
    setStoredPlayer(nextPlayer);

    setCompletedQuests(nextCompleted);
    setAcceptedQuestIds(nextAccepted);
    setPlayer(nextPlayer);

    // Trigger Mission Complete domain expansion overlay
    setCelebration({
      questTitle: quest.title,
      xpGained: quest.xp,
    });

    // If grade upgraded, show level-up modal after brief moment or together
    if (oldGrade !== newGrade) {
      setTimeout(() => {
        setLevelUpModal({
          oldGrade,
          newGrade,
        });
      }, 900);
    }
  }, [player, completedQuests, acceptedQuestIds]);

  const runDemoMode = useCallback(() => {
    const res = execDemoMode();
    setPlayer(getStoredPlayer());
    setAcceptedQuestIds(getStoredAcceptedQuestIds());
    return res;
  }, []);

  const resetProgress = useCallback(() => {
    execResetProgress();
    setPlayer(getStoredPlayer());
    setAcceptedQuestIds(getStoredAcceptedQuestIds());
    setCompletedQuests(getStoredCompletedQuests());
    setQuestSteps({});
  }, []);

  const dismissCelebration = useCallback(() => {
    setCelebration(null);
  }, []);

  const dismissLevelUp = useCallback(() => {
    setLevelUpModal(null);
  }, []);

  return (
    <GameContext.Provider
      value={{
        player,
        acceptedQuestIds,
        completedQuests,
        questSteps,
        activeQuests,
        gradeInfo,
        badges,
        unlockedBadgesCount,
        celebration,
        levelUpModal,
        updatePlayerName,
        toggleStep,
        completeMission,
        acceptQuest,
        runDemoMode,
        resetProgress,
        dismissCelebration,
        dismissLevelUp,
        streakDays,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
