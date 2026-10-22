import React, { useEffect } from 'react';
import { LevelConfig, PuppySticker } from '../types/game';
import { sounds } from '../utils/audio';
import { Star, Trophy, ArrowRight, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VictoryModalProps {
  levelConfig: LevelConfig;
  stats: {
    correct: number;
    attempted: number;
    stars: number;
    maxStreak: number;
  };
  unlockedSticker: PuppySticker | null;
  onNextLevel: () => void;
  onReplay: () => void;
  onViewAlbum: () => void;
  onBackToLevels: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  levelConfig,
  stats,
  unlockedSticker,
  onNextLevel,
  onReplay,
  onViewAlbum,
  onBackToLevels,
}) => {
  const isPass = stats.stars > 0;

  useEffect(() => {
    if (isPass) {
      sounds.playVictory();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 },
      });
    }
  }, [isPass]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border-4 border-amber-200 relative overflow-hidden">
        {/* Header Ribbon */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-amber-800 text-xs font-black uppercase tracking-wider mb-2">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          <span>{isPass ? '¡Misión Cumplida!' : '¡Buen Esfuerzo!'}</span>
        </div>

        <h2 className="font-display font-black text-2xl text-slate-800 tracking-tight">
          {levelConfig.title}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {isPass
            ? '¡Has reventado las burbujas correctas con éxito!'
            : 'Estuviste muy cerca. ¡Inténtalo de nuevo para ganar tus estrellas!'}
        </p>

        {/* 3 Large Animated Stars */}
        <div className="flex items-center justify-center gap-3 my-5">
          {[1, 2, 3].map((starIdx) => {
            const earned = starIdx <= stats.stars;
            return (
              <div
                key={starIdx}
                className={`transform transition-all duration-500 ${
                  earned ? 'scale-110 animate-bounce' : 'scale-90 opacity-40'
                }`}
                style={{ animationDelay: `${starIdx * 0.15}s` }}
              >
                <Star
                  className={`w-12 h-12 ${
                    earned
                      ? 'fill-amber-400 text-amber-500 filter drop-shadow-md'
                      : 'fill-slate-200 text-slate-300'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Round Performance Badges */}
        <div className="grid grid-cols-2 gap-2 bg-slate-50 border border-slate-100 p-3 rounded-2xl mb-4">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              Aciertos
            </span>
            <span className="font-display font-extrabold text-base text-slate-800">
              {stats.correct} de {stats.attempted}
            </span>
          </div>
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              Mejor Racha
            </span>
            <span className="font-display font-extrabold text-base text-amber-600">
              🔥 {stats.maxStreak}
            </span>
          </div>
        </div>

        {/* New Sticker Notification Banner */}
        {unlockedSticker && (
          <div
            onClick={onViewAlbum}
            className="mb-4 p-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-between gap-2 shadow-md cursor-pointer hover:opacity-95 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <img
                src={unlockedSticker.image}
                alt={unlockedSticker.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 object-contain rounded-lg"
              />
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase text-pink-200 block">
                  ¡Nuevo Sticker!
                </span>
                <span className="font-display font-extrabold text-xs block">
                  {unlockedSticker.name}
                </span>
              </div>
            </div>
            <Award className="w-5 h-5 text-yellow-300 mr-1" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {isPass && levelConfig.level < 10 && (
            <button
              onClick={() => {
                sounds.playPop();
                onNextLevel();
              }}
              className="w-full py-3 rounded-2xl font-display font-extrabold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Siguiente Misión</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => {
              sounds.playPop();
              onReplay();
            }}
            className="w-full py-2.5 rounded-2xl font-display font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repetir Nivel</span>
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              onBackToLevels();
            }}
            className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
          >
            Volver a la Lista de Niveles
          </button>
        </div>
      </div>
    </div>
  );
};
