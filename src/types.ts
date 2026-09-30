export type QuestCategory = "Workshop" | "Library" | "Coding" | "Club" | "Wellness" | "Secret";
export type SorcererGrade = "Grade 4" | "Grade 3" | "Grade 2" | "Grade 1" | "Special Grade";

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: QuestCategory;
  grade: SorcererGrade;
  xp: number;
  bounty: string;
  locationId: string;              // must match an id in LOCATIONS
  photo?: string;                  // optional override; default = the location's photo
  proofType: "photo" | "code" | "none";
}

export interface CompletedQuestRecord {
  id: string;
  proof?: string;
  completedAt: string;
}

export interface PlayerData {
  name: string;
  xp: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: "Common" | "Rare" | "Special Grade";
}
