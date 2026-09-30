import { QUESTS } from '../data/quests';
import { Quest } from '../types';

// Simple deterministic hash from date string (YYYY-MM-DD)
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Pseudo-random number generator seeded with integer
function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDailyQuests(dateStr: string = getTodayDateString()): Quest[] {
  const seed = hashString(dateStr);
  const rng = seededRandom(seed);

  // Shuffle copy of QUESTS deterministically
  const shuffled = [...QUESTS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Ensure variety if possible (distinct categories)
  const selected: Quest[] = [];
  const usedCategories = new Set<string>();

  for (const q of shuffled) {
    if (!usedCategories.has(q.category) && selected.length < 3) {
      selected.push(q);
      usedCategories.add(q.category);
    }
  }

  // If fewer than 3 due to categories, fill up with remaining
  for (const q of shuffled) {
    if (selected.length >= 3) break;
    if (!selected.some((s) => s.id === q.id)) {
      selected.push(q);
    }
  }

  return selected.slice(0, 3);
}

export function getSecondsUntilMidnight(): number {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  return Math.max(0, Math.floor((tomorrow.getTime() - now.getTime()) / 1000));
}

export function formatCountdown(totalSeconds: number): { hours: string; minutes: string; seconds: string } {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}
