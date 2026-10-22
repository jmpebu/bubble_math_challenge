export type OperationType = 'addition' | 'subtraction' | 'multiplication' | 'division';

export interface MathProblem {
  id: string;
  num1: number;
  num2: number;
  operation: OperationType;
  symbol: string;
  answer: number;
  options: number[];
  hintText?: string;
}

export interface LevelConfig {
  level: number;
  title: string;
  subtitle: string;
  description: string;
  allowedOps: OperationType[];
  timePerProblem: number; // in seconds
  problemsToPass: number;
  starThresholds: {
    oneStar: number; // min correct
    twoStars: number;
    threeStars: number;
  };
  rewardStickerId?: string;
  badgeName: string;
  themeColor: string;
}

export interface PuppySticker {
  id: string;
  name: string;
  role: string;
  catchphrase: string;
  image: string;
  bgColor: string;
  borderColor: string;
  unlockCondition: string;
  unlockedLevelRequirement?: number;
  unlockedStreakRequirement?: number;
  unlockedOperationsRequirement?: { op: OperationType; count: number };
}

export interface PlacedSticker {
  id: string;
  stickerId: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  scale: number;
  rotation: number;
}

export interface UserProgress {
  highestLevelUnlocked: number;
  totalStars: number;
  levelStars: Record<number, number>; // level -> stars (1-3)
  levelHighScores: Record<number, number>;
  unlockedStickerIds: string[];
  totalCorrect: number;
  totalAttempted: number;
  currentStreak: number;
  maxStreak: number;
  operationCounts: Record<OperationType, number>;
  placedStickers: PlacedSticker[];
}

export interface GameSettings {
  soundEnabled: boolean;
  activeOperations: OperationType[];
  practiceMode: boolean; // no time pressure
  allLevelsUnlockedByParent: boolean;
}
