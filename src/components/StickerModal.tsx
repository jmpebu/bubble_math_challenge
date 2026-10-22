import React, { useEffect } from 'react';
import { PuppySticker } from '../types/game';
import { sounds } from '../utils/audio';
import { Sparkles, Volume2, X, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StickerModalProps {
  sticker: PuppySticker | null;
  isNewUnlock?: boolean;
  onClose: () => void;
}

export const StickerModal: React.FC<StickerModalProps> = ({
  sticker,
  isNewUnlock = false,
  onClose,
}) => {
  useEffect(() => {
    if (sticker && isNewUnlock) {
      sounds.playVictory();
      // Burst celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [sticker, isNewUnlock]);

  if (!sticker) return null;

  const handlePlayVoice = () => {
    sounds.playBark();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border-4 border-amber-200 relative overflow-hidden">
        {/* Decorative corner sparkles */}
        <div className="absolute top-2 left-2 text-amber-400">
          <Sparkles className="w-6 h-6 animate-spin duration-1000" />
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isNewUnlock && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-amber-800 text-xs font-black uppercase tracking-wider mb-2 animate-bounce">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>¡Nueva Pegatina Desbloqueada!</span>
          </div>
        )}

        {/* Sticker Image Card with gentle floating bounce */}
        <div className="relative my-3 mx-auto w-48 h-48 rounded-3xl bg-gradient-to-tr from-amber-100 via-pink-100 to-sky-100 p-2 shadow-inner border-2 border-amber-200 flex items-center justify-center group">
          <img
            src={sticker.image}
            alt={sticker.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain rounded-2xl drop-shadow-lg transform transition-transform group-hover:scale-105"
          />
          {/* Bark button overlay */}
          <button
            onClick={handlePlayVoice}
            title="Escuchar ladrido alegre"
            className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/95 text-indigo-600 shadow-md flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110 active:scale-95"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        <h3 className="font-display font-black text-2xl text-slate-800 tracking-tight">
          {sticker.name}
        </h3>
        <p className="text-xs font-bold text-sky-600 uppercase tracking-wide">
          {sticker.role}
        </p>

        {/* Catchphrase speech bubble */}
        <div className="my-3.5 p-3 rounded-2xl bg-sky-50 border border-sky-100 text-sky-900 font-display font-medium text-sm italic relative">
          "{sticker.catchphrase}"
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-sky-50 [clip-path:polygon(0_0,100%_0,50%_100%)] border-t border-sky-100"></div>
        </div>

        <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4">
          <span className="font-semibold text-slate-700">Misión cumplida:</span>{' '}
          {sticker.unlockCondition}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl font-display font-extrabold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 transition-all shadow-md active:scale-95"
        >
          ¡Genial!
        </button>
      </div>
    </div>
  );
};
