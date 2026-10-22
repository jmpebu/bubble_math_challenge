import React, { useState } from 'react';
import { GameSettings, OperationType } from '../types/game';
import { Lock, Unlock, Check, ShieldAlert, RotateCcw, X, HelpCircle } from 'lucide-react';

interface ParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onSaveSettings: (settings: GameSettings) => void;
  onResetProgress: () => void;
}

export const ParentModal: React.FC<ParentModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onResetProgress,
}) => {
  // Simple parent gate security question (e.g., 7 + 8 = 15)
  const [gateNum1] = useState(() => Math.floor(Math.random() * 8) + 7);
  const [gateNum2] = useState(() => Math.floor(Math.random() * 8) + 6);
  const [parentInput, setParentInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Local copy of settings to edit
  const [activeOps, setActiveOps] = useState<OperationType[]>(settings.activeOperations);
  const [practiceMode, setPracticeMode] = useState<boolean>(settings.practiceMode);
  const [allUnlocked, setAllUnlocked] = useState<boolean>(settings.allLevelsUnlockedByParent);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleVerifyGate = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = gateNum1 + gateNum2;
    if (parseInt(parentInput.trim(), 10) === expected) {
      setIsUnlocked(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Respuesta incorrecta. Inténtalo de nuevo.');
      setParentInput('');
    }
  };

  const toggleOp = (op: OperationType) => {
    if (activeOps.includes(op)) {
      if (activeOps.length === 1) {
        alert('Debes mantener al menos una operación activa.');
        return;
      }
      setActiveOps(activeOps.filter((o) => o !== op));
    } else {
      setActiveOps([...activeOps, op]);
    }
  };

  const handleSave = () => {
    onSaveSettings({
      ...settings,
      activeOperations: activeOps,
      practiceMode,
      allLevelsUnlockedByParent: allUnlocked,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-indigo-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-indigo-700">
            {isUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            <h2 className="font-display font-bold text-lg text-slate-800">Zona de Padres y Ajustes</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isUnlocked ? (
          <form onSubmit={handleVerifyGate} className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl mx-auto flex items-center justify-center">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-800 text-base">Control Parental</h3>
              <p className="text-xs text-slate-500 mt-1">
                Para ajustar niveles y operaciones, responde a esta pregunta rápida:
              </p>
            </div>

            <div className="bg-indigo-50/70 border border-indigo-100 p-3 rounded-2xl">
              <span className="text-xl font-bold font-mono text-indigo-900">
                {gateNum1} + {gateNum2} = ?
              </span>
            </div>

            <input
              type="number"
              value={parentInput}
              onChange={(e) => setParentInput(e.target.value)}
              placeholder="Escribe el resultado..."
              autoFocus
              className="w-full text-center text-lg font-bold border-2 border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-indigo-500"
            />

            {errorMessage && (
              <p className="text-xs text-rose-500 font-medium">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-display font-bold py-2.5 rounded-xl transition-all shadow-md active:scale-95"
            >
              Acceder a Configuración
            </button>
          </form>
        ) : (
          <div className="py-4 space-y-5">
            {/* Operations selection */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Operaciones Matemáticas Activas
              </label>
              <p className="text-xs text-slate-500 mb-3">
                Selecciona qué operaciones se incluirán en las rondas de juego:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'addition' as OperationType, label: 'Suma (+)', color: 'border-emerald-300 bg-emerald-50 text-emerald-800' },
                  { id: 'subtraction' as OperationType, label: 'Resta (−)', color: 'border-blue-300 bg-blue-50 text-blue-800' },
                  { id: 'multiplication' as OperationType, label: 'Multiplicación (×)', color: 'border-purple-300 bg-purple-50 text-purple-800' },
                  { id: 'division' as OperationType, label: 'División (÷)', color: 'border-amber-300 bg-amber-50 text-amber-800' },
                ].map((item) => {
                  const isChecked = activeOps.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleOp(item.id)}
                      className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all font-display font-bold text-sm ${
                        isChecked
                          ? `${item.color} shadow-xs ring-2 ring-indigo-200`
                          : 'border-slate-200 bg-slate-50 text-slate-400 opacity-70'
                      }`}
                    >
                      <span>{item.label}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-indigo-600 text-white' : 'border border-slate-300'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Practice mode toggle */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center justify-between cursor-pointer p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
                <div>
                  <div className="font-display font-bold text-sm text-slate-800">
                    Modo Práctica Relajado
                  </div>
                  <div className="text-xs text-slate-500">
                    Sin reloj ni prisa. Ideal si está aprendiendo una tabla nueva.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={practiceMode}
                  onChange={(e) => setPracticeMode(e.target.checked)}
                  className="w-5 h-5 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
                />
              </label>
            </div>

            {/* Unlock all levels */}
            <div>
              <label className="flex items-center justify-between cursor-pointer p-3 rounded-2xl bg-amber-50/60 border border-amber-200 hover:bg-amber-100/60 transition-colors">
                <div>
                  <div className="font-display font-bold text-sm text-amber-900">
                    Desbloquear los 10 Niveles
                  </div>
                  <div className="text-xs text-amber-700">
                    Permite acceder a cualquier nivel sin tener que pasarse los anteriores.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={allUnlocked}
                  onChange={(e) => setAllUnlocked(e.target.checked)}
                  className="w-5 h-5 rounded text-amber-600 accent-amber-600 cursor-pointer"
                />
              </label>
            </div>

            {/* Reset progress */}
            <div className="pt-2 border-t border-slate-100">
              {!showResetConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 py-2 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar progreso de estrellas y stickers</span>
                </button>
              ) : (
                <div className="bg-rose-50 border border-rose-200 p-3 rounded-2xl text-center space-y-2">
                  <p className="text-xs text-rose-800 font-bold">
                    ¿Seguro? Se borrarán las estrellas y stickers desbloqueados.
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(false)}
                      className="px-3 py-1 bg-white text-slate-600 text-xs font-bold rounded-lg border border-slate-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onResetProgress();
                        setShowResetConfirm(false);
                        onClose();
                      }}
                      className="px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded-lg hover:bg-rose-700"
                    >
                      Sí, reiniciar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 rounded-xl font-display font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="w-1/2 py-2.5 rounded-xl font-display font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md"
              >
                Guardar Ajustes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
