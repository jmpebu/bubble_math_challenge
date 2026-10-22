import React, { useState, useEffect } from 'react';
import { GameSettings, LevelConfig, PuppySticker, UserProgress } from './types/game';
import { LEVEL_CONFIGS } from './utils/mathGenerator';
import { PUPPY_STICKERS } from './data/puppies';
import { sounds } from './utils/audio';
import {
  loadGameSettings,
  loadUserProgress,
  saveGameSettings,
  saveUserProgress,
  INITIAL_PROGRESS,
} from './utils/storage';
import { HeaderNav } from './components/HeaderNav';
import { LevelSelect } from './components/LevelSelect';
import { PlayArena } from './components/PlayArena';
import { StickerAlbum } from './components/StickerAlbum';
import { ParentModal } from './components/ParentModal';
import { VictoryModal } from './components/VictoryModal';
import { StickerModal } from './components/StickerModal';
import { AndroidInstallModal } from './components/AndroidInstallModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { usePWAInstall } from './hooks/usePWAInstall';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [settings, setSettings] = useState<GameSettings>(loadGameSettings);
  const [currentTab, setCurrentTab] = useState<'levels' | 'album' | 'play'>('levels');
  const [activeLevel, setActiveLevel] = useState<LevelConfig | null>(null);
  const [isParentOpen, setIsParentOpen] = useState(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);

  // PWA install hook
  const { isInstallable, install } = usePWAInstall();

  // Victory and rewards
  const [victoryStats, setVictoryStats] = useState<{
    correct: number;
    attempted: number;
    stars: number;
    maxStreak: number;
  } | null>(null);
  const [newlyUnlockedSticker, setNewlyUnlockedSticker] = useState<PuppySticker | null>(null);
  const [inspectSticker, setInspectSticker] = useState<PuppySticker | null>(null);

  // Keep sound controller in sync with settings
  useEffect(() => {
    sounds.enabled = settings.soundEnabled;
  }, [settings.soundEnabled]);

  // Save changes to localStorage
  const updateProgress = (newProg: UserProgress) => {
    setProgress(newProg);
    saveUserProgress(newProg);
  };

  const updateSettings = (newSet: GameSettings) => {
    setSettings(newSet);
    saveGameSettings(newSet);
  };

  const handleToggleSound = () => {
    const next = !settings.soundEnabled;
    sounds.enabled = next;
    updateSettings({ ...settings, soundEnabled: next });
    if (next) sounds.playPop();
  };

  const handleSelectLevel = (level: LevelConfig) => {
    setActiveLevel(level);
    setCurrentTab('play');
    setVictoryStats(null);
  };

  const handleFinishLevel = (stats: {
    correct: number;
    attempted: number;
    stars: number;
    maxStreak: number;
  }) => {
    if (!activeLevel) return;

    const prevStarsForLevel = progress.levelStars[activeLevel.level] || 0;
    const bestStars = Math.max(prevStarsForLevel, stats.stars);
    const starDelta = Math.max(0, bestStars - prevStarsForLevel);

    let nextHighest = progress.highestLevelUnlocked;
    if (stats.stars > 0 && activeLevel.level >= progress.highestLevelUnlocked) {
      nextHighest = Math.min(10, activeLevel.level + 1);
    }

    const updatedUnlocked = [...progress.unlockedStickerIds];
    let newlyFoundSticker: PuppySticker | null = null;

    // Check level reward sticker
    if (stats.stars > 0 && activeLevel.rewardStickerId) {
      if (!updatedUnlocked.includes(activeLevel.rewardStickerId)) {
        updatedUnlocked.push(activeLevel.rewardStickerId);
        const st = PUPPY_STICKERS.find((s) => s.id === activeLevel.rewardStickerId);
        if (st) newlyFoundSticker = st;
      }
    }

    // Check streak reward (Everest requires streak >= 6)
    if (stats.maxStreak >= 6 && !updatedUnlocked.includes('everest_snow')) {
      updatedUnlocked.push('everest_snow');
      const st = PUPPY_STICKERS.find((s) => s.id === 'everest_snow');
      if (st && !newlyFoundSticker) newlyFoundSticker = st;
    }

    const newProgressState: UserProgress = {
      ...progress,
      highestLevelUnlocked: nextHighest,
      totalStars: progress.totalStars + starDelta,
      levelStars: {
        ...progress.levelStars,
        [activeLevel.level]: bestStars,
      },
      unlockedStickerIds: updatedUnlocked,
      totalCorrect: progress.totalCorrect + stats.correct,
      totalAttempted: progress.totalAttempted + stats.attempted,
      maxStreak: Math.max(progress.maxStreak, stats.maxStreak),
    };

    updateProgress(newProgressState);
    setVictoryStats(stats);
    setNewlyUnlockedSticker(newlyFoundSticker);
  };

  const handleNextLevel = () => {
    if (!activeLevel) return;
    const nextLvlNum = activeLevel.level + 1;
    const nextConfig = LEVEL_CONFIGS.find((l) => l.level === nextLvlNum);
    if (nextConfig) {
      setActiveLevel(nextConfig);
      setVictoryStats(null);
      setNewlyUnlockedSticker(null);
      setCurrentTab('play');
    } else {
      // Reached beyond level 10
      setCurrentTab('levels');
      setVictoryStats(null);
    }
  };

  const handleReplayLevel = () => {
    setVictoryStats(null);
    setNewlyUnlockedSticker(null);
  };

  const handleResetAllProgress = () => {
    sounds.playPop();
    updateProgress(INITIAL_PROGRESS);
    setActiveLevel(null);
    setCurrentTab('levels');
  };

  return (
    <div className="min-h-screen max-w-full w-full overflow-x-hidden bg-gradient-to-b from-sky-50 via-indigo-50/30 to-pink-50/40 text-slate-800 flex flex-col font-sans selection:bg-pink-300">
      {/* Top Bar Header */}
      <HeaderNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          sounds.playPop();
          setCurrentTab(tab);
          setVictoryStats(null);
        }}
        stars={progress.totalStars}
        soundEnabled={settings.soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenSettings={() => {
          sounds.playPop();
          setIsParentOpen(true);
        }}
        onOpenAndroidInstall={() => {
          sounds.playPop();
          setIsAndroidModalOpen(true);
        }}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden pb-20 md:pb-8">
        {currentTab === 'levels' && (
          <LevelSelect
            progress={progress}
            settings={settings}
            onSelectLevel={handleSelectLevel}
          />
        )}

        {currentTab === 'album' && (
          <StickerAlbum
            progress={progress}
            onUpdatePlacedStickers={(placed) => {
              updateProgress({ ...progress, placedStickers: placed });
            }}
          />
        )}

        {currentTab === 'play' && activeLevel && (
          <PlayArena
            key={`${activeLevel.level}-${victoryStats ? 'finished' : 'running'}`}
            levelConfig={activeLevel}
            settings={settings}
            progress={progress}
            onFinishLevel={handleFinishLevel}
            onBackToLevels={() => {
              setCurrentTab('levels');
              setActiveLevel(null);
            }}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation for Small Screens */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          sounds.playPop();
          setCurrentTab(tab);
          setVictoryStats(null);
        }}
      />

      {/* Victory / Level Summary Modal */}
      {victoryStats && activeLevel && (
        <VictoryModal
          levelConfig={activeLevel}
          stats={victoryStats}
          unlockedSticker={newlyUnlockedSticker}
          onNextLevel={handleNextLevel}
          onReplay={handleReplayLevel}
          onViewAlbum={() => {
            setVictoryStats(null);
            setCurrentTab('album');
          }}
          onBackToLevels={() => {
            setVictoryStats(null);
            setCurrentTab('levels');
            setActiveLevel(null);
          }}
        />
      )}

      {/* Direct Sticker Reward Modal */}
      <StickerModal
        sticker={inspectSticker}
        onClose={() => setInspectSticker(null)}
      />

      {/* Parent Zone Settings Modal */}
      <ParentModal
        isOpen={isParentOpen}
        onClose={() => setIsParentOpen(false)}
        settings={settings}
        onSaveSettings={updateSettings}
        onResetProgress={handleResetAllProgress}
      />

      {/* Android Native / PWA Installation Modal */}
      <AndroidInstallModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
        isInstallable={isInstallable}
        onTriggerPWAInstall={install}
      />
    </div>
  );
}
