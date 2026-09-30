import { Category, Grade } from '../types';

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; border: string; hex: string; lightBg: string }> = {
  Workshop: {
    bg: 'bg-[#3B82F6]',
    text: 'text-[#3B82F6]',
    border: 'border-[#3B82F6]',
    hex: '#3B82F6',
    lightBg: 'bg-[#3B82F6]/15',
  },
  Library: {
    bg: 'bg-[#22C55E]',
    text: 'text-[#22C55E]',
    border: 'border-[#22C55E]',
    hex: '#22C55E',
    lightBg: 'bg-[#22C55E]/15',
  },
  Coding: {
    bg: 'bg-[#EF4444]',
    text: 'text-[#EF4444]',
    border: 'border-[#EF4444]',
    hex: '#EF4444',
    lightBg: 'bg-[#EF4444]/15',
  },
  Club: {
    bg: 'bg-[#A855F7]',
    text: 'text-[#A855F7]',
    border: 'border-[#A855F7]',
    hex: '#A855F7',
    lightBg: 'bg-[#A855F7]/15',
  },
  Wellness: {
    bg: 'bg-[#14B8A6]',
    text: 'text-[#14B8A6]',
    border: 'border-[#14B8A6]',
    hex: '#14B8A6',
    lightBg: 'bg-[#14B8A6]/15',
  },
  Secret: {
    bg: 'bg-[#F5B301]',
    text: 'text-[#F5B301]',
    border: 'border-[#F5B301]',
    hex: '#F5B301',
    lightBg: 'bg-[#F5B301]/15',
  },
};

export const GRADE_CONFIG: Record<Grade, { rank: number; kanji: string; color: string; badgeBg: string; textCol: string; glow: string }> = {
  "Grade 4": {
    rank: 1,
    kanji: "四級",
    color: "text-zinc-400",
    badgeBg: "bg-zinc-800/80 border-zinc-700",
    textCol: "#A1A1AA",
    glow: "shadow-zinc-500/10",
  },
  "Grade 3": {
    rank: 2,
    kanji: "三級",
    color: "text-blue-400",
    badgeBg: "bg-blue-950/60 border-blue-800/50",
    textCol: "#60A5FA",
    glow: "shadow-blue-500/20",
  },
  "Grade 2": {
    rank: 3,
    kanji: "二級",
    color: "text-purple-400",
    badgeBg: "bg-purple-950/60 border-purple-800/50",
    textCol: "#C084FC",
    glow: "shadow-purple-500/25",
  },
  "Grade 1": {
    rank: 4,
    kanji: "一級",
    color: "text-amber-400",
    badgeBg: "bg-amber-950/60 border-amber-600/50",
    textCol: "#FBBF24",
    glow: "shadow-amber-500/30",
  },
  "Special Grade": {
    rank: 5,
    kanji: "特級",
    color: "text-rose-400",
    badgeBg: "bg-rose-950/80 border-rose-600/70",
    textCol: "#FB7185",
    glow: "shadow-rose-600/40",
  },
};

export const LOCATION_TYPES = [
  'All',
  'Gate',
  'Academic',
  'Canteen',
  'Library',
  'Department',
  'Sports',
  'Park',
  'Workshop',
] as const;
