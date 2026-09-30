export type QuestCategory = "Workshop" | "Library" | "Coding" | "Club" | "Wellness" | "Secret";
export type SorcererGrade = "Grade 4" | "Grade 3" | "Grade 2" | "Grade 1" | "Special Grade";
export type Category = QuestCategory;
export type Grade = SorcererGrade;

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
export type CompletedQuest = CompletedQuestRecord;

export interface PlayerData {
  name: string;
  xp: number;
}
export type PlayerProfile = PlayerData;

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: "Common" | "Rare" | "Special Grade";
}
