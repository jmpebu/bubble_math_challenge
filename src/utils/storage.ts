import { GameSettings, PlacedSticker, UserProgress } from '../types/game';

const PROGRESS_KEY = 'bubble_math_progress_v1';
const SETTINGS_KEY = 'bubble_math_settings_v1';

export const INITIAL_PROGRESS: UserProgress = {
  highestLevelUnlocked: 1,
  totalStars: 0,
  levelStars: {},
  levelHighScores: {},
  unlockedStickerIds: ['chase_police'],
  totalCorrect: 0,
  totalAttempted: 0,
  currentStreak: 0,
  maxStreak: 0,
  operationCounts: {
    addition: 0,
    subtraction: 0,
    multiplication: 0,
    division: 0,
  },
  placedStickers: [],
};

export const INITIAL_SETTINGS: GameSettings = {
  soundEnabled: true,
  activeOperations: ['addition', 'subtraction', 'multiplication', 'division'],
  practiceMode: false,
  allLevelsUnlockedByParent: false,
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_PROGRESS,
      ...parsed,
      operationCounts: {
        ...INITIAL_PROGRESS.operationCounts,
        ...(parsed.operationCounts || {}),
      },
    };
  } catch {
    return INITIAL_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage write errors (e.g. private mode quota)
  }
}

export function loadGameSettings(): GameSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return INITIAL_SETTINGS;
    return {
      ...INITIAL_SETTINGS,
      ...JSON.parse(raw),
    };
  } catch {
    return INITIAL_SETTINGS;
  }
}

export function saveGameSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Ignore
  }
}
