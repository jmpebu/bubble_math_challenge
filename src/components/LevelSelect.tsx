import React from 'react';
import { GameSettings, LevelConfig, UserProgress } from '../types/game';
import { LEVEL_CONFIGS } from '../utils/mathGenerator';
import { PUPPY_STICKERS } from '../data/puppies';
import { Star, Lock, Play, Clock, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface LevelSelectProps {
  progress: UserProgress;
  settings: GameSettings;
  onSelectLevel: (level: LevelConfig) => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({
  progress,
  settings,
  onSelectLevel,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-300">
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-white text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Misiones Matemáticas de la Patrulla</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
            ¡Elige tu Misión y Revienta Burbujas!
          </h1>
          <p className="text-sky-100 text-sm mt-1 max-w-xl">
            Avanza por los 10 niveles de dificultad. Cuanto más alto sea el nivel, más rápido deberás pensar para atrapar la burbuja correcta.
          </p>

          {/* Quick Stats Strip */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="bg-white/15 backdrop-blur-xs px-3.5 py-1.5 rounded-2xl flex items-center gap-2 border border-white/20">
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span className="font-display font-extrabold text-sm">
                {progress.totalStars} Estrellas Ganadas
              </span>
            </div>

            <div className="bg-white/15 backdrop-blur-xs px-3.5 py-1.5 rounded-2xl flex items-center gap-2 border border-white/20">
              <span className="text-sm">🔥</span>
              <span className="font-display font-extrabold text-sm">
                Mejor Racha: {progress.maxStreak}
              </span>
            </div>

            {settings.practiceMode && (
              <div className="bg-emerald-500/80 backdrop-blur-xs px-3 py-1 rounded-2xl text-xs font-bold text-white border border-emerald-300">
                🌿 Modo Práctica Sin Tiempo Activo
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 10 Levels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LEVEL_CONFIGS.map((config) => {
          const isUnlocked =
            settings.allLevelsUnlockedByParent ||
            config.level <= progress.highestLevelUnlocked;
          const starsEarned = progress.levelStars[config.level] || 0;
          const rewardSticker = config.rewardStickerId
            ? PUPPY_STICKERS.find((s) => s.id === config.rewardStickerId)
            : null;
          const isStickerUnlocked = rewardSticker
            ? progress.unlockedStickerIds.includes(rewardSticker.id)
            : false;

          return (
            <div
              key={config.level}
              onClick={() => {
                if (isUnlocked) {
                  sounds.playPop();
                  onSelectLevel(config);
                } else {
                  sounds.playWrong();
                }
              }}
              className={`relative rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-white border-indigo-100 hover:border-sky-400 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer group'
                  : 'bg-slate-50/80 border-slate-200 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Level Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-xl shadow-md text-white bg-gradient-to-tr ${
                      isUnlocked ? config.themeColor : 'from-slate-400 to-slate-500'
                    }`}
                  >
                    {config.level}
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-base text-slate-800 leading-tight group-hover:text-sky-600 transition-colors">
                      {config.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {config.subtitle}
                    </p>
                  </div>
                </div>

                {/* Lock or Play Icon */}
                <div className="shrink-0">
                  {isUnlocked ? (
                    <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                {config.description}
              </p>

              {/* Level Footer: Stars, Time, and Sticker Reward */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                {/* 3 Stars indicator */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((starIdx) => (
                    <Star
                      key={starIdx}
                      className={`w-4 h-4 ${
                        starIdx <= starsEarned
                          ? 'fill-amber-400 text-amber-500 filter drop-shadow-xs'
                          : 'text-slate-200 fill-slate-100'
                      }`}
                    />
                  ))}
                </div>

                {/* Time info */}
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {settings.practiceMode ? 'Ilimitado' : `${config.timePerProblem}s / burbuja`}
                  </span>
                </div>

                {/* Sticker milestone badge */}
                {rewardSticker && (
                  <div
                    title={`Recompensa: ${rewardSticker.name}`}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      isStickerUnlocked
                        ? 'bg-amber-50 border-amber-200 text-amber-800'
                        : 'bg-slate-100 border-slate-200 text-slate-500'
                    }`}
                  >
                    <span>🐾</span>
                    <span className="hidden sm:inline">{rewardSticker.name.split(' ')[0]}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
