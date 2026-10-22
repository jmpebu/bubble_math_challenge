import React, { useState } from 'react';
import { PuppySticker, UserProgress } from '../types/game';
import { PUPPY_STICKERS } from '../data/puppies';
import { StickerModal } from './StickerModal';
import { Lock, Sparkles, Volume2, Award, Plus, Trash2, RotateCw } from 'lucide-react';
import { sounds } from '../utils/audio';

interface StickerAlbumProps {
  progress: UserProgress;
  onUpdatePlacedStickers: (stickers: UserProgress['placedStickers']) => void;
}

export const StickerAlbum: React.FC<StickerAlbumProps> = ({
  progress,
  onUpdatePlacedStickers,
}) => {
  const [selectedSticker, setSelectedSticker] = useState<PuppySticker | null>(null);
  const [activeTab, setActiveTab] = useState<'collection' | 'playground'>('collection');

  const unlockedCount = PUPPY_STICKERS.filter((s) =>
    progress.unlockedStickerIds.includes(s.id)
  ).length;

  const handleAddStickerToScene = (stickerId: string) => {
    sounds.playPop();
    const newPlaced = {
      id: `placed-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      stickerId,
      x: 35 + Math.random() * 30, // center-ish
      y: 40 + Math.random() * 25,
      scale: 1,
      rotation: Math.floor(Math.random() * 20) - 10,
    };
    onUpdatePlacedStickers([...progress.placedStickers, newPlaced]);
  };

  const handleRemoveStickerFromScene = (id: string) => {
    sounds.playPop();
    onUpdatePlacedStickers(progress.placedStickers.filter((s) => s.id !== id));
  };

  const handleRotateSticker = (id: string) => {
    sounds.playPop();
    onUpdatePlacedStickers(
      progress.placedStickers.map((s) =>
        s.id === id ? { ...s, rotation: (s.rotation + 25) % 360 } : s
      )
    );
  };

  const handleClearScene = () => {
    onUpdatePlacedStickers([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-300">
      {/* Album Hero Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-center text-8xl">
          🐾
        </div>
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-white text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Colección Oficial de Logros</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
            Álbum de Pegatinas de la Patrulla
          </h1>
          <p className="text-pink-100 text-sm mt-1">
            Gana estrellas y supera niveles para desbloquear a todos los cachorros rescatistas.
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-xs px-3.5 py-1.5 rounded-2xl flex items-center gap-2 border border-white/20">
              <span className="text-xs uppercase font-extrabold tracking-wider text-white">
                Progreso:
              </span>
              <span className="font-display font-extrabold text-lg text-yellow-300">
                {unlockedCount} / {PUPPY_STICKERS.length}
              </span>
            </div>
            <div className="flex-1 bg-white/20 h-3 rounded-full overflow-hidden p-0.5 max-w-xs">
              <div
                className="bg-yellow-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${(unlockedCount / PUPPY_STICKERS.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub tabs: Ver Colección vs Escenario Creativo */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setActiveTab('collection')}
          className={`px-5 py-2 rounded-2xl font-display font-bold text-sm transition-all ${
            activeTab === 'collection'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Ver Álbum ({unlockedCount}/{PUPPY_STICKERS.length})
        </button>
        <button
          onClick={() => setActiveTab('playground')}
          className={`px-5 py-2 rounded-2xl font-display font-bold text-sm transition-all flex items-center gap-1.5 ${
            activeTab === 'playground'
              ? 'bg-pink-500 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Pegar en Escenario ({progress.placedStickers.length})</span>
        </button>
      </div>

      {activeTab === 'collection' ? (
        /* Sticker Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {PUPPY_STICKERS.map((sticker) => {
            const isUnlocked = progress.unlockedStickerIds.includes(sticker.id);

            return (
              <div
                key={sticker.id}
                onClick={() => {
                  if (isUnlocked) {
                    sounds.playPop();
                    setSelectedSticker(sticker);
                  } else {
                    sounds.playWrong();
                  }
                }}
                className={`relative group rounded-3xl p-4 transition-all flex flex-col items-center text-center cursor-pointer ${
                  isUnlocked
                    ? 'bg-white border-2 border-indigo-100 hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1'
                    : 'bg-slate-100 border-2 border-dashed border-slate-300 opacity-60'
                }`}
              >
                {/* Sticker Badge Image */}
                <div className="relative w-32 h-32 mb-2 flex items-center justify-center">
                  {isUnlocked ? (
                    <img
                      src={sticker.image}
                      alt={sticker.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain rounded-2xl drop-shadow-md transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-slate-200/80 flex flex-col items-center justify-center text-slate-400">
                      <Lock className="w-8 h-8 mb-1" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Bloqueado</span>
                    </div>
                  )}
                </div>

                <h3 className="font-display font-bold text-base text-slate-800 leading-tight">
                  {sticker.name}
                </h3>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5 line-clamp-1">
                  {sticker.role}
                </p>

                {isUnlocked ? (
                  <span className="mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    ¡Conseguido!
                  </span>
                ) : (
                  <p className="mt-2 text-[10px] text-slate-400 font-medium px-2 leading-tight">
                    {sticker.unlockCondition}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Interactive Sticker Scene Playground */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-600">
              ¡Pega y gira a tus cachorros para crear tu foto de equipo de rescate!
            </p>
            {progress.placedStickers.length > 0 && (
              <button
                onClick={handleClearScene}
                className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpiar Escenario</span>
              </button>
            )}
          </div>

          {/* Canvas Board Backdrop */}
          <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl overflow-hidden border-4 border-indigo-200 shadow-lg bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-200 select-none">
            {/* Background elements */}
            <div className="absolute top-4 left-6 text-3xl opacity-80 animate-float-slow">☁️</div>
            <div className="absolute top-8 right-12 text-4xl opacity-80 animate-float-reverse">☀️</div>
            <div className="absolute top-16 left-1/3 text-2xl opacity-60">☁️</div>
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-emerald-400 to-emerald-300 border-t-4 border-emerald-500/30"></div>
            <div className="absolute bottom-2 left-6 text-2xl">🌲</div>
            <div className="absolute bottom-3 right-8 text-2xl">🏡</div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-display font-bold text-emerald-900 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">
              Parque de Aventuras de la Patrulla
            </div>

            {progress.placedStickers.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-white/20 backdrop-blur-[1px]">
                <div className="w-14 h-14 rounded-full bg-white/80 shadow-md flex items-center justify-center text-2xl mb-2 text-pink-500">
                  ✨
                </div>
                <h4 className="font-display font-bold text-lg text-slate-800">
                  El escenario está esperando a tus cachorros
                </h4>
                <p className="text-xs text-slate-600 max-w-xs mt-1">
                  Toca a cualquier cachorro de abajo para pegarlo en este paisaje.
                </p>
              </div>
            ) : (
              progress.placedStickers.map((placed) => {
                const stickerDef = PUPPY_STICKERS.find((s) => s.id === placed.stickerId);
                if (!stickerDef) return null;

                return (
                  <div
                    key={placed.id}
                    style={{
                      left: `${placed.x}%`,
                      top: `${placed.y}%`,
                      transform: `translate(-50%, -50%) rotate(${placed.rotation}deg)`,
                    }}
                    className="absolute group cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={stickerDef.image}
                        alt={stickerDef.name}
                        referrerPolicy="no-referrer"
                        className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-xl select-none pointer-events-none"
                      />
                      {/* Floating actions */}
                      <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-white/95 rounded-full p-1 shadow-md opacity-90 group-hover:opacity-100">
                        <button
                          onClick={() => handleRotateSticker(placed.id)}
                          title="Girar"
                          className="w-6 h-6 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-700 flex items-center justify-center"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleRemoveStickerFromScene(placed.id)}
                          title="Quitar"
                          className="w-6 h-6 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 flex items-center justify-center"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Add Bar: list of unlocked puppies to tap and add */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
              Tus Cachorros Disponibles para Pegar:
            </h4>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {PUPPY_STICKERS.filter((s) => progress.unlockedStickerIds.includes(s.id)).map(
                (sticker) => (
                  <button
                    key={sticker.id}
                    onClick={() => handleAddStickerToScene(sticker.id)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white border border-indigo-100 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all shrink-0 active:scale-95"
                  >
                    <img
                      src={sticker.image}
                      alt={sticker.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 object-contain rounded-lg"
                    />
                    <div className="text-left">
                      <span className="font-display font-bold text-xs text-slate-800 block">
                        {sticker.name}
                      </span>
                      <span className="text-[10px] text-sky-600 font-semibold flex items-center gap-0.5">
                        <Plus className="w-2.5 h-2.5" /> Pegar
                      </span>
                    </div>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Inspect Sticker Modal */}
      <StickerModal
        sticker={selectedSticker}
        onClose={() => setSelectedSticker(null)}
      />
    </div>
  );
};
