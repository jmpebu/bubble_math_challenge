import React from 'react';
import { Map, Award } from 'lucide-react';
import { sounds } from '../utils/audio';

interface MobileBottomNavProps {
  currentTab: 'levels' | 'album' | 'play';
  onSelectTab: (tab: 'levels' | 'album') => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
}) => {
  // Hide on desktop (md:) and during active gameplay to maximize bubble area
  if (currentTab === 'play') return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-indigo-100 shadow-lg px-4 py-2 transition-all">
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
        <button
          onClick={() => {
            sounds.playPop();
            onSelectTab('levels');
          }}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-2xl font-display font-extrabold text-sm transition-all active:scale-95 ${
            currentTab === 'levels'
              ? 'bg-sky-500 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>Niveles</span>
        </button>

        <button
          onClick={() => {
            sounds.playPop();
            onSelectTab('album');
          }}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-2xl font-display font-extrabold text-sm transition-all active:scale-95 ${
            currentTab === 'album'
              ? 'bg-pink-500 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Álbum Stickers</span>
        </button>
      </div>
    </nav>
  );
};
