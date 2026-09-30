import { SorcererGrade, Quest, CompletedQuestRecord, Badge } from "../types";
import { LOCATIONS } from "../data/locations";
import { QUESTS } from "../data/quests";

export interface GradeInfo {
  currentGrade: SorcererGrade;
  nextGrade: SorcererGrade | null;
  minXp: number;
  nextXp: number | null;
  progressPercent: number;
}

export const GRADE_THRESHOLDS: { grade: SorcererGrade; xp: number }[] = [
  { grade: "Grade 4", xp: 0 },
  { grade: "Grade 3", xp: 300 },
  { grade: "Grade 2", xp: 800 },
  { grade: "Grade 1", xp: 1600 },
  { grade: "Special Grade", xp: 3000 },
];

export function getGradeInfo(xp: number): GradeInfo {
  if (xp >= 3000) {
    return {
      currentGrade: "Special Grade",
      nextGrade: null,
      minXp: 3000,
      nextXp: null,
      progressPercent: 100,
    };
  }
  if (xp >= 1600) {
    const progress = Math.min(100, Math.floor(((xp - 1600) / (3000 - 1600)) * 100));
    return {
      currentGrade: "Grade 1",
      nextGrade: "Special Grade",
      minXp: 1600,
      nextXp: 3000,
      progressPercent: progress,
    };
  }
  if (xp >= 800) {
    const progress = Math.min(100, Math.floor(((xp - 800) / (1600 - 800)) * 100));
    return {
      currentGrade: "Grade 2",
      nextGrade: "Grade 1",
      minXp: 800,
      nextXp: 1600,
      progressPercent: progress,
    };
  }
  if (xp >= 300) {
    const progress = Math.min(100, Math.floor(((xp - 300) / (800 - 300)) * 100));
    return {
      currentGrade: "Grade 3",
      nextGrade: "Grade 2",
      minXp: 300,
      nextXp: 800,
      progressPercent: progress,
    };
  }
  const progress = Math.min(100, Math.floor((xp / 300) * 100));
  return {
    currentGrade: "Grade 4",
    nextGrade: "Grade 3",
    minXp: 0,
    nextXp: 300,
    progressPercent: progress,
  };
}

export const CATEGORY_COLORS: Record<Quest["category"], { text: string; bg: string; border: string; hex: string }> = {
  Workshop: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", hex: "#3B82F6" },
  Library: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", hex: "#22C55E" },
  Coding: { text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", hex: "#EF4444" },
  Club: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", hex: "#A855F7" },
  Wellness: { text: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/30", hex: "#14B8A6" },
  Secret: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", hex: "#F5B301" },
};

export const BADGE_DEFINITIONS: Badge[] = [
  {
    id: "first-blood",
    title: "First Blood",
    description: "Complete your first cursed mission on campus.",
    icon: "Swords",
    rarity: "Common",
  },
  {
    id: "bookworm",
    title: "Bookworm",
    description: "Conquer 3 Library missions in the D6 archives.",
    icon: "BookOpen",
    rarity: "Rare",
  },
  {
    id: "code-exorcist",
    title: "Code Exorcist",
    description: "Purge 3 Coding curses across the academic computer labs.",
    icon: "Terminal",
    rarity: "Rare",
  },
  {
    id: "club-ally",
    title: "Club Ally",
    description: "Reinforce student sorcerer guilds with 2 Club missions.",
    icon: "Users",
    rarity: "Common",
  },
  {
    id: "iron-legs",
    title: "Iron Legs",
    description: "Complete 2 Wellness missions via heavenly restriction training.",
    icon: "Flame",
    rarity: "Common",
  },
  {
    id: "curse-hunter",
    title: "Curse Hunter",
    description: "Exorcise a total of 5 cursed missions campus-wide.",
    icon: "ShieldAlert",
    rarity: "Rare",
  },
  {
    id: "secret-seeker",
    title: "Secret Seeker",
    description: "Unveil at least 1 classified Secret cursed mission.",
    icon: "Eye",
    rarity: "Rare",
  },
  {
    id: "gate-keeper",
    title: "Gate Keeper",
    description: "Complete perimeter surveillance at all 4 campus gates (Gate 1, 2, 3, 4).",
    icon: "Key",
    rarity: "Special Grade",
  },
  {
    id: "canteen-regular",
    title: "Canteen Regular",
    description: "Perform recon at both D4 Canteen and Food Republic.",
    icon: "Coffee",
    rarity: "Common",
  },
  {
    id: "explorer",
    title: "Explorer",
    description: "Exorcise anomalies across at least 5 distinct campus locations.",
    icon: "Compass",
    rarity: "Rare",
  },
  {
    id: "grade-1-sorcerer",
    title: "Grade 1 Sorcerer",
    description: "Attain 1,600+ Cursed XP to become a recognized Grade 1 Sorcerer.",
    icon: "Award",
    rarity: "Special Grade",
  },
  {
    id: "special-grade",
    title: "Special Grade",
    description: "Transcendant supremacy: reach 3,000+ Cursed XP as a Special Grade Sorcerer.",
    icon: "Crown",
    rarity: "Special Grade",
  },
];

export interface UnlockedBadgeState {
  badge: Badge;
  unlocked: boolean;
  progressText: string;
  percent: number;
}

export function evaluateBadges(
  completedQuests: CompletedQuestRecord[],
  totalXp: number,
  allQuests: Quest[] = QUESTS
): UnlockedBadgeState[] {
  const questMap = new Map<string, Quest>(allQuests.map((q) => [q.id, q]));
  
  const completedFullQuests = completedQuests
    .map((c) => questMap.get(c.id))
    .filter((q): q is Quest => q !== undefined);

  const libraryCount = completedFullQuests.filter((q) => q.category === "Library").length;
  const codingCount = completedFullQuests.filter((q) => q.category === "Coding").length;
  const clubCount = completedFullQuests.filter((q) => q.category === "Club").length;
  const wellnessCount = completedFullQuests.filter((q) => q.category === "Wellness").length;
  const secretCount = completedFullQuests.filter((q) => q.category === "Secret").length;

  const completedLocations = new Set(completedFullQuests.map((q) => q.locationId));
  const hasGate1 = completedLocations.has("gate-1");
  const hasGate2 = completedLocations.has("gate-2");
  const hasGate3 = completedLocations.has("gate-3");
  const hasGate4 = completedLocations.has("gate-4");
  const gatesCount = [hasGate1, hasGate2, hasGate3, hasGate4].filter(Boolean).length;

  const hasD4 = completedLocations.has("d4-canteen");
  const hasFoodRep = completedLocations.has("food-republic");
  const canteensCount = [hasD4, hasFoodRep].filter(Boolean).length;

  return BADGE_DEFINITIONS.map((badge) => {
    switch (badge.id) {
      case "first-blood": {
        const unlocked = completedQuests.length >= 1;
        return {
          badge,
          unlocked,
          progressText: `${Math.min(completedQuests.length, 1)} / 1`,
          percent: unlocked ? 100 : 0,
        };
      }
      case "bookworm": {
        const unlocked = libraryCount >= 3;
        return {
          badge,
          unlocked,
          progressText: `${Math.min(libraryCount, 3)} / 3 Library`,
          percent: Math.min(100, Math.floor((libraryCount / 3) * 100)),
        };
      }
      case "code-exorcist": {
        const unlocked = codingCount >= 3;
        return {
          badge,
          unlocked,
          progressText: `${Math.min(codingCount, 3)} / 3 Coding`,
          percent: Math.min(100, Math.floor((codingCount / 3) * 100)),
        };
      }
      case "club-ally": {
        const unlocked = clubCount >= 2;
        return {
          badge,
          unlocked,
          progressText: `${Math.min(clubCount, 2)} / 2 Club`,
          percent: Math.min(100, Math.floor((clubCount / 2) * 100)),
        };
      }
      case "iron-legs": {
        const unlocked = wellnessCount >= 2;
        return {
          badge,
          unlocked,
          progressText: `${Math.min(wellnessCount, 2)} / 2 Wellness`,
          percent: Math.min(100, Math.floor((wellnessCount / 2) * 100)),
        };
      }
      case "curse-hunter": {
        const unlocked = completedQuests.length >= 5;
        return {
          badge,
          unlocked,
          progressText: `${Math.min(completedQuests.length, 5)} / 5 Quests`,
          percent: Math.min(100, Math.floor((completedQuests.length / 5) * 100)),
        };
      }
      case "secret-seeker": {
        const unlocked = secretCount >= 1;
        return {
          badge,
          unlocked,
          progressText: `${Math.min(secretCount, 1)} / 1 Secret`,
          percent: unlocked ? 100 : 0,
        };
      }
      case "gate-keeper": {
        const unlocked = gatesCount === 4;
        return {
          badge,
          unlocked,
          progressText: `${gatesCount} / 4 Gates`,
          percent: Math.floor((gatesCount / 4) * 100),
        };
      }
      case "canteen-regular": {
        const unlocked = canteensCount === 2;
        return {
          badge,
          unlocked,
          progressText: `${canteensCount} / 2 Canteens`,
          percent: Math.floor((canteensCount / 2) * 100),
        };
      }
      case "explorer": {
        const count = completedLocations.size;
        const unlocked = count >= 5;
        return {
          badge,
          unlocked,
          progressText: `${Math.min(count, 5)} / 5 Locations`,
          percent: Math.min(100, Math.floor((count / 5) * 100)),
        };
      }
      case "grade-1-sorcerer": {
        const unlocked = totalXp >= 1600;
        return {
          badge,
          unlocked,
          progressText: `${Math.min(totalXp, 1600)} / 1,600 XP`,
          percent: Math.min(100, Math.floor((totalXp / 1600) * 100)),
        };
      }
      case "special-grade": {
        const unlocked = totalXp >= 3000;
        return {
          badge,
          unlocked,
          progressText: `${Math.min(totalXp, 3000)} / 3,000 XP`,
          percent: Math.min(100, Math.floor((totalXp / 3000) * 100)),
        };
      }
      default:
        return {
          badge,
          unlocked: false,
          progressText: "0%",
          percent: 0,
        };
    }
  });
}
