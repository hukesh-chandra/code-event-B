import { SorcererGrade } from "../types";

export interface LeaderboardEntry {
  id: string;
  name: string;
  department: string;
  grade: SorcererGrade;
  allTimeXp: number;
  thisWeekXp: number;
  avatarSeed: string;
  bountiesClaimed: number;
}

export const SEEDED_SORCERERS: LeaderboardEntry[] = [
  {
    id: "sorcerer-1",
    name: "Satoru Gojo",
    department: "DACA (B5)",
    grade: "Special Grade",
    allTimeXp: 4850,
    thisWeekXp: 1250,
    avatarSeed: "gojo",
    bountiesClaimed: 24,
  },
  {
    id: "sorcerer-2",
    name: "Yuta Okkotsu",
    department: "Computer Science (B2)",
    grade: "Special Grade",
    allTimeXp: 3900,
    thisWeekXp: 980,
    avatarSeed: "yuta",
    bountiesClaimed: 19,
  },
  {
    id: "sorcerer-3",
    name: "Kento Nanami",
    department: "Business & Management (D1)",
    grade: "Grade 1",
    allTimeXp: 2850,
    thisWeekXp: 720,
    avatarSeed: "nanami",
    bountiesClaimed: 15,
  },
  {
    id: "sorcerer-4",
    name: "Aoi Todo",
    department: "Sports Complex & Mech (B1)",
    grade: "Grade 1",
    allTimeXp: 2400,
    thisWeekXp: 610,
    avatarSeed: "todo",
    bountiesClaimed: 12,
  },
  {
    id: "sorcerer-5",
    name: "Maki Zen'in",
    department: "Workshop & Robotics",
    grade: "Grade 1",
    allTimeXp: 2150,
    thisWeekXp: 540,
    avatarSeed: "maki",
    bountiesClaimed: 11,
  },
  {
    id: "sorcerer-6",
    name: "Toge Inumaki",
    department: "D6 Library & Linguistics",
    grade: "Grade 2",
    allTimeXp: 1450,
    thisWeekXp: 420,
    avatarSeed: "toge",
    bountiesClaimed: 8,
  },
  {
    id: "sorcerer-7",
    name: "Nobara Kugisaki",
    department: "Design & Media (A2)",
    grade: "Grade 2",
    allTimeXp: 1200,
    thisWeekXp: 390,
    avatarSeed: "nobara",
    bountiesClaimed: 7,
  },
  {
    id: "sorcerer-8",
    name: "Noritoshi Kamo",
    department: "Biotech (C2)",
    grade: "Grade 2",
    allTimeXp: 950,
    thisWeekXp: 280,
    avatarSeed: "kamo",
    bountiesClaimed: 5,
  },
  {
    id: "sorcerer-9",
    name: "Mai Zen'in",
    department: "Electronics (D3)",
    grade: "Grade 3",
    allTimeXp: 680,
    thisWeekXp: 190,
    avatarSeed: "mai",
    bountiesClaimed: 4,
  },
  {
    id: "sorcerer-10",
    name: "Kasumi Miwa",
    department: "Aerospace (B3)",
    grade: "Grade 3",
    allTimeXp: 480,
    thisWeekXp: 150,
    avatarSeed: "miwa",
    bountiesClaimed: 3,
  },
];
