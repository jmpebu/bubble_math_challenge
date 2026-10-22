import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameSettings, LevelConfig, MathProblem, UserProgress } from '../types/game';
import { generateProblem } from '../utils/mathGenerator';
import { PUPPY_STICKERS } from '../data/puppies';
import { sounds } from '../utils/audio';
import { ArrowLeft, Pause, Play, Sparkles, Star, Flame, Lightbulb, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PlayArenaProps {
  levelConfig: LevelConfig;
  settings: GameSettings;
  progress: UserProgress;
  onFinishLevel: (stats: {
    correct: number;
    attempted: number;
    stars: number;
    maxStreak: number;
  }) => void;
  onBackToLevels: () => void;
}

// Vibrant colors for bubbles
const BUBBLE_THEMES = [
  {
    bg: 'from-sky-400/90 via-sky-300/80 to-blue-500/90',
    border: 'border-sky-200/90',
    shadow: 'shadow-sky-300/50',
    text: 'text-sky-950',
    ring: 'hover:ring-sky-300',
  },
  {
    bg: 'from-pink-400/90 via-rose-300/80 to-pink-500/90',
    border: 'border-pink-200/90',
    shadow: 'shadow-pink-300/50',
    text: 'text-rose-950',
    ring: 'hover:ring-pink-300',
  },
  {
    bg: 'from-emerald-400/90 via-emerald-300/80 to-teal-500/90',
    border: 'border-emerald-200/90',
    shadow: 'shadow-emerald-300/50',
    text: 'text-emerald-950',
    ring: 'hover:ring-emerald-300',
  },
  {
    bg: 'from-amber-400/90 via-yellow-300/80 to-orange-500/90',
    border: 'border-amber-200/90',
    shadow: 'shadow-amber-300/50',
    text: 'text-amber-950',
    ring: 'hover:ring-amber-300',
  },
  {
    bg: 'from-purple-400/90 via-fuchsia-300/80 to-indigo-500/90',
    border: 'border-purple-200/90',
    shadow: 'shadow-purple-300/50',
    text: 'text-purple-950',
    ring: 'hover:ring-purple-300',
  },
];

export const PlayArena: React.FC<PlayArenaProps> = ({
  levelConfig,
  settings,
  progress,
  onFinishLevel,
  onBackToLevels,
}) => {
  const totalQuestions = levelConfig.problemsToPass;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreakInRound, setMaxStreakInRound] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Active problem
  const [currentProblem, setCurrentProblem] = useState<MathProblem>(() =>
    generateProblem(levelConfig.level, settings.activeOperations)
  );

  // Timer state
  const timeLimit = levelConfig.timePerProblem;
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);

  // Interaction feedback
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [poppingOption, setPoppingOption] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [puppyMood, setPuppyMood] = useState<'happy' | 'cheer' | 'thinking' | 'encouraging'>('thinking');

  // Mascot puppy for this level
  const mascot = PUPPY_STICKERS.find((s) => s.id === levelConfig.rewardStickerId) || PUPPY_STICKERS[0];

  const handleNextProblem = useCallback(
    (isCorrect: boolean, chosenNum: number) => {
      setSelectedAnswer(chosenNum);

      if (isCorrect) {
        sounds.playPop();
        sounds.playCorrect();
        setPoppingOption(chosenNum);
        setCorrectCount((prev) => prev + 1);
        setCurrentStreak((prev) => {
          const next = prev + 1;
          setMaxStreakInRound((m) => Math.max(m, next));
          return next;
        });
        setPuppyMood('cheer');

        // Cheerful messages for 8-year-old girl
        const cheerMessages = [
          '¡Increíble!',
          '¡Eres genial!',
          '¡Súper cálculo!',
          '¡Guau, qué rápido!',
          '¡A toda marcha!',
          '¡Burbuja reventada!',
        ];
        setFeedbackMessage(cheerMessages[Math.floor(Math.random() * cheerMessages.length)]);

        // Small sparkle confetti on streaks
        if ((currentStreak + 1) % 3 === 0) {
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.7 },
          });
        }
      } else {
        sounds.playWrong();
        setPoppingOption(chosenNum);
        setCurrentStreak(0);
        setPuppyMood('encouraging');

        const encourageMessages = [
          '¡Casi! ¡Sigue así!',
          '¡Tú puedes!',
          '¡Ánimo, la próxima sale!',
          '¡Buen intento!',
        ];
        setFeedbackMessage(encourageMessages[Math.floor(Math.random() * encourageMessages.length)]);
      }

      // Delay before switching to next question or ending round
      setTimeout(() => {
        if (questionIndex + 1 >= totalQuestions) {
          // Finished level
          const finalCorrect = isCorrect ? correctCount + 1 : correctCount;
          let stars = 0;
          if (finalCorrect >= levelConfig.starThresholds.threeStars) stars = 3;
          else if (finalCorrect >= levelConfig.starThresholds.twoStars) stars = 2;
          else if (finalCorrect >= levelConfig.starThresholds.oneStar) stars = 1;

          onFinishLevel({
            correct: finalCorrect,
            attempted: totalQuestions,
            stars,
            maxStreak: Math.max(maxStreakInRound, isCorrect ? currentStreak + 1 : currentStreak),
          });
        } else {
          setQuestionIndex((prev) => prev + 1);
          setCurrentProblem(generateProblem(levelConfig.level, settings.activeOperations));
          setTimeLeft(timeLimit);
          setSelectedAnswer(null);
          setPoppingOption(null);
          setFeedbackMessage('');
          setPuppyMood('thinking');
          setShowHint(false);
        }
      }, 750);
    },
    [
      correctCount,
      currentStreak,
      levelConfig,
      maxStreakInRound,
      onFinishLevel,
      questionIndex,
      settings.activeOperations,
      timeLimit,
      totalQuestions,
    ]
  );

  // Timer countdown loop
  useEffect(() => {
    if (settings.practiceMode || isPaused || selectedAnswer !== null) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time expired for this question
          handleNextProblem(false, -999);
          return 0;
        }
        if (prev <= 4) {
          sounds.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [handleNextProblem, isPaused, selectedAnswer, settings.practiceMode]);

  // Handle Bubble Tap
  const handleBubbleClick = (option: number) => {
    if (selectedAnswer !== null || isPaused) return;
    const isCorrect = option === currentProblem.answer;
    handleNextProblem(isCorrect, option);
  };

  const timerRatio = settings.practiceMode ? 1 : Math.max(0, timeLeft / timeLimit);
  const isTimeCritical = !settings.practiceMode && timeLeft <= 4;

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col justify-between w-full max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4 select-none overflow-x-hidden">
      {/* Play HUD Header */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-4 shadow-lg border-2 border-indigo-100 flex flex-col gap-2.5 sm:gap-3">
        <div className="flex items-center justify-between gap-2">
          {/* Back button */}
          <button
            onClick={() => {
              sounds.playPop();
              onBackToLevels();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-bold text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Niveles</span>
          </button>

          {/* Level Info & Question Counter */}
          <div className="text-center">
            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
              {levelConfig.title}
            </span>
            <div className="font-display font-black text-slate-800 text-sm sm:text-base flex items-center justify-center gap-1">
              <span>Burbuja {questionIndex + 1}</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-500">{totalQuestions}</span>
            </div>
          </div>

          {/* Streak & Pause */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl text-amber-800 font-extrabold text-xs">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Racha: {currentStreak}</span>
            </div>

            <button
              onClick={() => {
                sounds.playPop();
                setIsPaused(!isPaused);
              }}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            >
              {isPaused ? <Play className="w-4 h-4 fill-current ml-0.5" /> : <Pause className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Timer Bar */}
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 relative">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              settings.practiceMode
                ? 'bg-emerald-400 w-full'
                : isTimeCritical
                ? 'bg-rose-500 animate-pulse'
                : timeLeft > timeLimit * 0.4
                ? 'bg-gradient-to-r from-sky-400 to-indigo-500'
                : 'bg-amber-400'
            }`}
            style={{ width: `${timerRatio * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Playing Stage */}
      <div className="flex-1 my-4 flex flex-col items-center justify-center relative">
        {/* Math Problem Billboard */}
        <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border-4 border-sky-200 text-center relative overflow-hidden transform transition-transform">
          {/* Hint button */}
          {currentProblem.hintText && (
            <button
              onClick={() => {
                sounds.playPop();
                setShowHint(!showHint);
              }}
              title="Ver pista amigable"
              className="absolute top-3 right-3 text-amber-500 hover:text-amber-600 bg-amber-50 p-1.5 rounded-xl border border-amber-200"
            >
              <Lightbulb className="w-4 h-4" />
            </button>
          )}

          <div className="text-xs font-extrabold text-sky-500 uppercase tracking-widest mb-1">
            Resuelve la Operación
          </div>

          <div className="font-display font-black text-4xl sm:text-5xl text-slate-800 tracking-tight flex items-center justify-center gap-3 py-2">
            <span>{currentProblem.num1}</span>
            <span className="text-sky-500 text-3xl sm:text-4xl">{currentProblem.symbol}</span>
            <span>{currentProblem.num2}</span>
            <span className="text-slate-400">=</span>
            <span className="w-16 h-14 sm:w-20 sm:h-16 rounded-2xl bg-sky-50 border-2 border-dashed border-sky-300 text-sky-600 flex items-center justify-center text-3xl sm:text-4xl">
              {selectedAnswer !== null ? currentProblem.answer : '?'}
            </span>
          </div>

          {/* Optional Hint Box */}
          {showHint && currentProblem.hintText && (
            <div className="mt-2 text-xs font-medium text-amber-800 bg-amber-50/80 p-2 rounded-xl border border-amber-200 animate-in fade-in">
              💡 {currentProblem.hintText}
            </div>
          )}

          {/* Feedback Reaction Message */}
          {feedbackMessage && (
            <div
              className={`mt-2 font-display font-black text-lg animate-bounce ${
                selectedAnswer === currentProblem.answer ? 'text-emerald-500' : 'text-rose-500'
              }`}
            >
              {feedbackMessage}
            </div>
          )}
        </div>

        {/* Floating Bubble Play Area */}
        <div className="w-full max-w-lg mt-6 grid grid-cols-2 gap-4 sm:gap-6 px-2">
          {currentProblem.options.map((option, idx) => {
            const theme = BUBBLE_THEMES[idx % BUBBLE_THEMES.length];
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentProblem.answer;
            const isPopping = poppingOption === option;

            // Highlight correct when answered
            let stateClass = '';
            if (selectedAnswer !== null) {
              if (isCorrect) {
                stateClass = 'ring-4 ring-emerald-400 scale-105';
              } else if (isSelected) {
                stateClass = 'ring-4 ring-rose-400 animate-gentle-shake opacity-80';
              } else {
                stateClass = 'opacity-40';
              }
            }

            return (
              <div
                key={`${currentProblem.id}-opt-${idx}`}
                onClick={() => handleBubbleClick(option)}
                className={`relative aspect-square max-w-[150px] sm:max-w-[170px] mx-auto w-full cursor-pointer transition-all duration-200 ${
                  idx % 2 === 0 ? 'animate-float-slow' : 'animate-float-reverse'
                }`}
                style={{
                  animationDelay: `${idx * 0.4}s`,
                }}
              >
                {/* Bubble Container */}
                <button
                  type="button"
                  disabled={selectedAnswer !== null || isPaused}
                  className={`w-full h-full rounded-full bg-gradient-to-br ${theme.bg} border-4 ${
                    theme.border
                  } shadow-lg ${theme.shadow} ${
                    theme.ring
                  } flex items-center justify-center relative overflow-hidden transition-all transform hover:scale-105 active:scale-95 ${
                    isPopping ? 'animate-pop-burst' : 'animate-bubble-wobble'
                  } ${stateClass}`}
                >
                  {/* Top Glossy Highlight (Soap Bubble Specular Reflection) */}
                  <div className="absolute inset-0 bubble-specular pointer-events-none rounded-full"></div>
                  <div className="absolute top-2 left-4 w-7 h-3 rounded-full bg-white/70 rotate-[-25deg] filter blur-[0.5px]"></div>
                  <div className="absolute bottom-3 right-4 w-3 h-3 rounded-full bg-white/40"></div>

                  {/* Bubble Answer Number */}
                  <span
                    className={`font-display font-black text-3xl sm:text-4xl ${theme.text} drop-shadow-sm select-none relative z-10`}
                  >
                    {option}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mascot Cheer Corner */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-md border border-indigo-100 flex items-center justify-between gap-3 max-w-md mx-auto w-full">
        <div className="flex items-center gap-3">
          <img
            src={mascot.image}
            alt={mascot.name}
            referrerPolicy="no-referrer"
            className="w-12 h-12 object-contain rounded-xl drop-shadow-md"
          />
          <div>
            <span className="font-display font-bold text-xs text-slate-800 block">
              {mascot.name}
            </span>
            <p className="text-[11px] text-slate-500 italic">
              {puppyMood === 'cheer'
                ? '¡¡Guau!! ¡Menudo cálculo!'
                : puppyMood === 'encouraging'
                ? '¡No te rindas, tú puedes!'
                : mascot.catchphrase}
            </p>
          </div>
        </div>

        <button
          onClick={() => sounds.playBark()}
          title="Ladrar"
          className="w-8 h-8 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-600 flex items-center justify-center transition-colors"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Paused Overlay */}
      {isPaused && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 text-center shadow-2xl max-w-xs w-full space-y-4">
            <h3 className="font-display font-black text-2xl text-slate-800">Juego en Pausa</h3>
            <p className="text-xs text-slate-500">Tómate un respiro cuando quieras.</p>
            <div className="space-y-2">
              <button
                onClick={() => setIsPaused(false)}
                className="w-full py-2.5 rounded-xl font-display font-bold text-white bg-sky-500 hover:bg-sky-600 shadow-md"
              >
                Continuar Jugando
              </button>
              <button
                onClick={onBackToLevels}
                className="w-full py-2.5 rounded-xl font-display font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Volver al Menú
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
