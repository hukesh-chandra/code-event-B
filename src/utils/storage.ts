import { PlayerData, CompletedQuestRecord } from "../types";
import { QUESTS } from "../data/quests";

const KEYS = {
  ACCEPTED: "cu_accepted_quests",
  COMPLETED: "cu_completed_quests",
  PLAYER: "cu_player",
  STEPS: "cu_quest_steps",
  SEEN_GRADE: "cu_seen_grade",
};

export const INITIAL_PLAYER: PlayerData = {
  name: "Yuji Itadori",
  xp: 150,
};

export const INITIAL_ACCEPTED_QUEST_IDS = [
  "quest-lib-01",
  "quest-code-01",
  "quest-well-01",
];

export function getStoredPlayer(): PlayerData {
  try {
    const raw = localStorage.getItem(KEYS.PLAYER);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed.name === "string" && typeof parsed.xp === "number") {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to read player from localStorage", e);
  }
  setStoredPlayer(INITIAL_PLAYER);
  return INITIAL_PLAYER;
}

export function setStoredPlayer(player: PlayerData): void {
  try {
    localStorage.setItem(KEYS.PLAYER, JSON.stringify(player));
  } catch (e) {
    console.error("Failed to write player to localStorage", e);
  }
}

export function getStoredAcceptedQuestIds(): string[] {
  try {
    const raw = localStorage.getItem(KEYS.ACCEPTED);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to read accepted quests from localStorage", e);
  }
  setStoredAcceptedQuestIds(INITIAL_ACCEPTED_QUEST_IDS);
  return INITIAL_ACCEPTED_QUEST_IDS;
}

export function setStoredAcceptedQuestIds(ids: string[]): void {
  try {
    localStorage.setItem(KEYS.ACCEPTED, JSON.stringify(ids));
  } catch (e) {
    console.error("Failed to write accepted quests to localStorage", e);
  }
}

export function getStoredCompletedQuests(): CompletedQuestRecord[] {
  try {
    const raw = localStorage.getItem(KEYS.COMPLETED);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to read completed quests from localStorage", e);
  }
  setStoredCompletedQuests([]);
  return [];
}

export function setStoredCompletedQuests(records: CompletedQuestRecord[]): void {
  try {
    localStorage.setItem(KEYS.COMPLETED, JSON.stringify(records));
  } catch (e) {
    console.error("Failed to write completed quests to localStorage", e);
  }
}

export function getStoredQuestSteps(): Record<string, boolean[]> {
  try {
    const raw = localStorage.getItem(KEYS.STEPS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to read quest steps", e);
  }
  return {};
}

export function setStoredQuestStep(questId: string, stepIndex: number, completed: boolean): Record<string, boolean[]> {
  const current = getStoredQuestSteps();
  const questSteps = current[questId] ? [...current[questId]] : [false, false, false];
  questSteps[stepIndex] = completed;
  current[questId] = questSteps;
  try {
    localStorage.setItem(KEYS.STEPS, JSON.stringify(current));
  } catch (e) {
    console.error("Failed to update quest step", e);
  }
  return current;
}

/**
 * Resizes an image file down to maxDimension (default 800px) and returns base64 data URL
 * to safeguard localStorage quota.
 */
export function resizeImageFile(file: File, maxDimension = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("Failed to load image for resizing"));
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/**
 * Demo Mode for judges:
 * Auto-accepts 3 new available quests and adds +600 XP to accelerate progression testing.
 */
export function triggerDemoMode(): { addedQuestsCount: number; newXp: number } {
  const player = getStoredPlayer();
  const accepted = getStoredAcceptedQuestIds();
  const completed = getStoredCompletedQuests();
  const completedIds = new Set(completed.map((c) => c.id));
  const acceptedIds = new Set(accepted);

  const available = QUESTS.filter((q) => !completedIds.has(q.id) && !acceptedIds.has(q.id));
  const toAdd = available.slice(0, 3).map((q) => q.id);

  const newAccepted = [...accepted, ...toAdd];
  const newXp = player.xp + 600;

  setStoredAcceptedQuestIds(newAccepted);
  setStoredPlayer({ ...player, xp: newXp });

  return { addedQuestsCount: toAdd.length, newXp };
}

/**
 * Resets all progress back to initial baseline.
 */
export function resetAllProgress(): void {
  setStoredPlayer({ name: "Yuji Itadori", xp: 0 });
  setStoredAcceptedQuestIds(INITIAL_ACCEPTED_QUEST_IDS);
  setStoredCompletedQuests([]);
  try {
    localStorage.removeItem(KEYS.STEPS);
    localStorage.removeItem(KEYS.SEEN_GRADE);
  } catch (e) {
    console.error("Failed to clean up extra storage keys", e);
  }
}
