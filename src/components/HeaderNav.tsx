import React from 'react';
import { Volume2, VolumeX, Settings, Star, Award, Sparkles, Map, Smartphone } from 'lucide-react';

interface HeaderNavProps {
  currentTab: 'levels' | 'album' | 'play';
  onSelectTab: (tab: 'levels' | 'album') => void;
  stars: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onOpenAndroidInstall: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentTab,
  onSelectTab,
  stars,
  soundEnabled,
  onToggleSound,
  onOpenSettings,
  onOpenAndroidInstall,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-indigo-100 shadow-xs px-4 py-2.5 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Zone 1: Brand title */}
        <div 
          onClick={() => onSelectTab('levels')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-pink-400 flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform text-xl">
            🐾
          </div>
          <div className="leading-tight">
            <span className="font-display font-extrabold text-lg sm:text-xl text-slate-800 tracking-tight flex items-center gap-1.5">
              Bubble Math <span className="text-sky-500">Challenge</span>
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onSelectTab('levels')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
              currentTab === 'levels'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Niveles</span>
          </button>

          <button
            onClick={() => onSelectTab('album')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
              currentTab === 'album'
                ? 'bg-pink-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Álbum Stickers</span>
          </button>
        </nav>

        {/* Zone 3: Star Counter & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Star counter */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-xl text-amber-800 font-extrabold text-sm shadow-xs">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span className="tabular-nums">{stars}</span>
          </div>

          {/* Android Install Button */}
          <button
            onClick={onOpenAndroidInstall}
            title="Instalar en Android"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-display font-bold text-xs transition-all shadow-2xs hover:scale-102"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Instalar</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-sky-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Parent Zone / Settings */}
          <button
            onClick={onOpenSettings}
            aria-label="Zona de Padres y Configuración"
            title="Zona de Padres"
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors border border-indigo-100"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
