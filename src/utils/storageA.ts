import { CompletedQuest, PlayerProfile } from '../types';

const STORAGE_KEYS = {
  ACCEPTED: 'cu_accepted_quests',
  COMPLETED: 'cu_completed_quests',
  PLAYER: 'cu_player',
} as const;

const DEFAULT_PLAYER: PlayerProfile = {
  name: 'Sorcerer Megumi',
  xp: 450,
};

export function getAcceptedQuestIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACCEPTED);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load accepted quests:', e);
    return [];
  }
}

export function isQuestAccepted(id: string): boolean {
  const ids = getAcceptedQuestIds();
  return ids.includes(id);
}

export function acceptQuest(id: string): boolean {
  try {
    const ids = getAcceptedQuestIds();
    if (!ids.includes(id)) {
      const next = [...ids, id];
      localStorage.setItem(STORAGE_KEYS.ACCEPTED, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('cu_storage_update', { detail: { type: 'accepted', id } }));
      return true;
    }
    return false;
  } catch (e) {
    console.error('Failed to accept quest:', e);
    return false;
  }
}

export function abandonQuest(id: string): void {
  try {
    const ids = getAcceptedQuestIds();
    const next = ids.filter((item) => item !== id);
    localStorage.setItem(STORAGE_KEYS.ACCEPTED, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('cu_storage_update', { detail: { type: 'abandoned', id } }));
  } catch (e) {
    console.error('Failed to abandon quest:', e);
  }
}

export function getCompletedQuests(): CompletedQuest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load completed quests:', e);
    return [];
  }
}

export function isQuestCompleted(id: string): boolean {
  const list = getCompletedQuests();
  return list.some((item) => item.id === id);
}

export function getPlayerProfile(): PlayerProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PLAYER);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PLAYER, JSON.stringify(DEFAULT_PLAYER));
      return DEFAULT_PLAYER;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to get player profile:', e);
    return DEFAULT_PLAYER;
  }
}

export function updatePlayerXP(xpDelta: number): PlayerProfile {
  try {
    const current = getPlayerProfile();
    const updated: PlayerProfile = {
      ...current,
      xp: Math.max(0, (current.xp || 0) + xpDelta),
    };
    localStorage.setItem(STORAGE_KEYS.PLAYER, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('cu_storage_update', { detail: { type: 'player', player: updated } }));
    return updated;
  } catch (e) {
    console.error('Failed to update player XP:', e);
    return DEFAULT_PLAYER;
  }
}
