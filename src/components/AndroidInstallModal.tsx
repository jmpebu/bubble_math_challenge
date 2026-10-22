import React, { useState } from 'react';
import { Smartphone, Download, X, CheckCircle, Terminal, HelpCircle, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerPWAInstall?: () => void;
  isInstallable?: boolean;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({
  isOpen,
  onClose,
  onTriggerPWAInstall,
  isInstallable = false,
}) => {
  const [activeTab, setActiveTab] = useState<'pwa' | 'apk'>('pwa');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-4 border-sky-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-sky-600">
            <Smartphone className="w-5 h-5" />
            <h2 className="font-display font-bold text-lg text-slate-800">
              Instalar en Android
            </h2>
          </div>
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex p-1 bg-slate-100 rounded-2xl my-4">
          <button
            onClick={() => setActiveTab('pwa')}
            className={`flex-1 py-2 text-xs font-display font-bold rounded-xl transition-all ${
              activeTab === 'pwa'
                ? 'bg-white text-sky-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⭐ Opción 1: Instalar Directo (1 Clic)
          </button>
          <button
            onClick={() => setActiveTab('apk')}
            className={`flex-1 py-2 text-xs font-display font-bold rounded-xl transition-all ${
              activeTab === 'apk'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📦 Opción 2: Generar APK Nativo
          </button>
        </div>

        {activeTab === 'pwa' ? (
          <div className="space-y-4 text-left">
            <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-2xl">
              <h4 className="font-display font-bold text-sm text-sky-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-500" />
                ¿Qué ventajas tiene instalarla así?
              </h4>
              <p className="text-xs text-sky-800 mt-1 leading-relaxed">
                Se instala como una aplicación nativa en el móvil de tu hija con su propio icono de la Patrulla Canina, funciona <strong>100% sin internet (offline)</strong>, se abre a <strong>pantalla completa</strong> sin barras de navegador y no ocupa espacio de descargas.
              </p>
            </div>

            {isInstallable && onTriggerPWAInstall && (
              <button
                onClick={() => {
                  sounds.playPop();
                  onTriggerPWAInstall();
                  onClose();
                }}
                className="w-full py-3 rounded-2xl font-display font-black text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all"
              >
                <Download className="w-5 h-5" />
                <span>Instalar Ahora en este Dispositivo</span>
              </button>
            )}

            <div className="space-y-2.5 text-xs text-slate-600">
              <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
                Pasos para el móvil de tu hija:
              </span>
              <div className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="w-5 h-5 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong>Abre el enlace</strong> del juego en el navegador <strong>Google Chrome</strong> del móvil Android.
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="w-5 h-5 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  Pulsa el botón <strong>"Instalar App"</strong> en la barra superior o toca los <strong>tres puntos (⋮)</strong> arriba a la derecha en Chrome y selecciona <strong>"Instalar aplicación"</strong> (o <em>"Añadir a pantalla de inicio"</em>).
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  ¡Listo! Aparecerá el icono de <strong>Bubble Math Challenge</strong> en su escritorio como cualquier juego descargado.
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-left">
            <div className="bg-indigo-50 border border-indigo-200 p-3.5 rounded-2xl">
              <h4 className="font-display font-bold text-sm text-indigo-900 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-indigo-600" />
                Proyecto Capacitor / Android Studio preparado
              </h4>
              <p className="text-xs text-indigo-800 mt-1 leading-relaxed">
                Hemos configurado <strong>Capacitor</strong> (el estándar oficial de Ionic para convertir aplicaciones web modernas en APKs nativos de Android y paquetes AAB para Google Play Store).
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
                Comandos para compilar el APK en tu ordenador:
              </span>

              <div className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[11px] space-y-1.5 overflow-x-auto">
                <p className="text-emerald-400"># 1. Compilar el juego web</p>
                <p>npm run build</p>
                <p className="text-emerald-400 mt-2"># 2. Inicializar proyecto nativo Android</p>
                <p>npx cap add android</p>
                <p className="text-emerald-400 mt-2"># 3. Generar el APK directamente desde la terminal (¡Sin menús!):</p>
                <p className="text-amber-300">cd android && ./gradlew assembleDebug</p>
                <p className="text-slate-400 text-[10px] italic"># En Windows: cd android && gradlew assembleDebug</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-2 text-slate-600">
                <p className="font-semibold text-slate-800">
                  ¿Por qué no ves el menú en Android Studio?
                </p>
                <p>
                  1. <strong>Menú Hamburguesa (≡):</strong> En las versiones modernas de Android Studio, la barra de menús tradicional está oculta dentro del icono de tres rayas (≡) arriba a la izquierda. Toca <strong>≡ &gt; Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong>.
                </p>
                <p>
                  2. <strong>Atajo rápido:</strong> Presiona la tecla <kbd className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-800">Shift</kbd> <strong>dos veces seguidas</strong> (Shift + Shift), escribe <code>Build APK</code> y pulsa Enter.
                </p>
                <p>
                  3. <strong>Sincronización en curso:</strong> Si acabas de abrir el proyecto, mira abajo a la derecha: mientras diga <em>"Gradle sync in progress..."</em> o <em>"Indexing..."</em>, los menús de Build no aparecen hasta que termine (suele tardar 1-2 minutos la primera vez).
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="px-5 py-2 rounded-xl font-display font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-xs"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
