import { LevelConfig, MathProblem, OperationType } from '../types/game';

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    level: 1,
    title: 'Nivel 1: Cachorros Novatos',
    subtitle: 'Sumas y restas muy sencillas (1-10)',
    description: 'Perfecto para empezar a calentar motores con Chase.',
    allowedOps: ['addition', 'subtraction'],
    timePerProblem: 22,
    problemsToPass: 8,
    starThresholds: { oneStar: 5, twoStars: 7, threeStars: 8 },
    rewardStickerId: 'chase_police',
    badgeName: 'Placa de Policía',
    themeColor: 'from-blue-400 to-indigo-500',
  },
  {
    level: 2,
    title: 'Nivel 2: Vuelo Seguro',
    subtitle: 'Sumas y restas hasta 15',
    description: '¡Despega con Skye y revienta las burbujas!',
    allowedOps: ['addition', 'subtraction'],
    timePerProblem: 20,
    problemsToPass: 8,
    starThresholds: { oneStar: 5, twoStars: 7, threeStars: 8 },
    rewardStickerId: 'skye_pilot',
    badgeName: 'Alas de Piloto',
    themeColor: 'from-pink-400 to-rose-500',
  },
  {
    level: 3,
    title: 'Nivel 3: El Gran Salto',
    subtitle: 'Sumas y restas hasta 20 (cruzando la decena)',
    description: 'Ejercicios como 8 + 7 o 15 - 8 para agilizar el cálculo mental.',
    allowedOps: ['addition', 'subtraction'],
    timePerProblem: 18,
    problemsToPass: 8,
    starThresholds: { oneStar: 5, twoStars: 7, threeStars: 8 },
    badgeName: 'Insignia de Salto',
    themeColor: 'from-purple-400 to-indigo-500',
  },
  {
    level: 4,
    title: 'Nivel 4: ¡Fuego a la Acción!',
    subtitle: 'Primeras multiplicaciones (Tablas del 2, 5 y 10)',
    description: 'Marshall te acompaña para aprender a multiplicar sumando rápido.',
    allowedOps: ['multiplication', 'addition'],
    timePerProblem: 16,
    problemsToPass: 8,
    starThresholds: { oneStar: 5, twoStars: 7, threeStars: 8 },
    rewardStickerId: 'marshall_fire',
    badgeName: 'Casco de Bombero',
    themeColor: 'from-red-400 to-orange-500',
  },
  {
    level: 5,
    title: 'Nivel 5: Constructor de Tablas',
    subtitle: 'Tablas del 3 y del 4 + restas de apoyo',
    description: '¡Rubble a toda máquina resolviendo multiplicaciones!',
    allowedOps: ['multiplication', 'subtraction'],
    timePerProblem: 15,
    problemsToPass: 8,
    starThresholds: { oneStar: 5, twoStars: 7, threeStars: 8 },
    badgeName: 'Llave de Rubble',
    themeColor: 'from-amber-400 to-yellow-500',
  },
  {
    level: 6,
    title: 'Nivel 6: Maquinaria Pesada',
    subtitle: 'Tablas del 6 y del 7 + sumas hasta 50',
    description: 'Consolida las tablas intermedias de 3º de primaria.',
    allowedOps: ['multiplication', 'addition'],
    timePerProblem: 14,
    problemsToPass: 8,
    starThresholds: { oneStar: 5, twoStars: 7, threeStars: 8 },
    rewardStickerId: 'rubble_builder',
    badgeName: 'Medalla de Oro Rubble',
    themeColor: 'from-yellow-400 to-amber-600',
  },
  {
    level: 7,
    title: 'Nivel 7: Repartos Amigables',
    subtitle: 'Divisiones exactas (repartir entre 2, 3, 4 y 5)',
    description: '¿Cuánto le toca a cada cachorro si repartimos por igual?',
    allowedOps: ['division', 'multiplication'],
    timePerProblem: 14,
    problemsToPass: 8,
    starThresholds: { oneStar: 5, twoStars: 7, threeStars: 8 },
    badgeName: 'Brújula de Reparto',
    themeColor: 'from-teal-400 to-emerald-500',
  },
  {
    level: 8,
    title: 'Nivel 8: ¡Al Agua Patos!',
    subtitle: 'Tablas del 8 y del 9 + divisiones sencillas',
    description: 'Zuma te ayuda a sumergirte en las tablas más altas.',
    allowedOps: ['multiplication', 'division'],
    timePerProblem: 12,
    problemsToPass: 8,
    starThresholds: { oneStar: 5, twoStars: 7, threeStars: 8 },
    rewardStickerId: 'zuma_water',
    badgeName: 'Ancla Marina',
    themeColor: 'from-cyan-400 to-blue-600',
  },
  {
    level: 9,
    title: 'Nivel 9: Misión en la Nieve',
    subtitle: 'Operaciones mixtas combinadas hasta 100',
    description: 'Everest vigila desde la montaña: sumas, restas y tablas rápidas.',
    allowedOps: ['addition', 'subtraction', 'multiplication', 'division'],
    timePerProblem: 10,
    problemsToPass: 9,
    starThresholds: { oneStar: 6, twoStars: 8, threeStars: 9 },
    badgeName: 'Copo de Nieve Everest',
    themeColor: 'from-sky-400 to-indigo-600',
  },
  {
    level: 10,
    title: 'Nivel 10: Gran Maestra de Burbujas',
    subtitle: 'El desafío definitivo a máxima velocidad',
    description: '¡Demuestra que eres la campeona suprema de las matemáticas!',
    allowedOps: ['addition', 'subtraction', 'multiplication', 'division'],
    timePerProblem: 8,
    problemsToPass: 10,
    starThresholds: { oneStar: 7, twoStars: 9, threeStars: 10 },
    rewardStickerId: 'super_hero_pup',
    badgeName: 'Copa Súper Cachorro Dorado',
    themeColor: 'from-amber-300 via-yellow-400 to-orange-500',
  },
];

/**
 * Generates distractors that look plausible (close to the answer or common kid mistakes)
 */
function generateSmartDistractors(answer: number, count: number, minVal: number = 0, maxVal: number = 100): number[] {
  const distractors = new Set<number>();

  // Standard plausible offsets for 8yo arithmetic
  const offsets = [1, -1, 2, -2, 10, -10, 5, -5, 3, -3];
  // Shuffle offsets
  const shuffledOffsets = [...offsets].sort(() => Math.random() - 0.5);

  for (const offset of shuffledOffsets) {
    if (distractors.size >= count) break;
    const candidate = answer + offset;
    if (candidate >= minVal && candidate <= maxVal && candidate !== answer) {
      distractors.add(candidate);
    }
  }

  // If still not enough, generate random within bounds
  let attempts = 0;
  while (distractors.size < count && attempts < 30) {
    attempts++;
    const span = Math.max(4, Math.floor(answer * 0.4));
    const randomOffset = Math.floor(Math.random() * (span * 2 + 1)) - span;
    const candidate = Math.max(minVal, answer + (randomOffset === 0 ? 1 : randomOffset));
    if (candidate !== answer) {
      distractors.add(candidate);
    }
  }

  return Array.from(distractors);
}

/**
 * Generate a single math problem matching the level and allowed user operations
 */
export function generateProblem(levelNum: number, userActiveOps: OperationType[]): MathProblem {
  const levelConfig = LEVEL_CONFIGS.find((l) => l.level === levelNum) || LEVEL_CONFIGS[0];

  // Intersect level allowed ops with parent/user chosen active operations
  let candidateOps = levelConfig.allowedOps.filter((op) => userActiveOps.includes(op));

  // Fallback: If intersection is empty, use userActiveOps if available, or addition
  if (candidateOps.length === 0) {
    candidateOps = userActiveOps.length > 0 ? userActiveOps : ['addition'];
  }

  // Pick a random operation from candidateOps
  const operation = candidateOps[Math.floor(Math.random() * candidateOps.length)];

  let num1 = 1;
  let num2 = 1;
  let answer = 2;
  let symbol = '+';
  let hintText = '';

  switch (operation) {
    case 'addition': {
      symbol = '+';
      if (levelNum === 1) {
        // Simple 1-10
        num1 = Math.floor(Math.random() * 6) + 1; // 1-6
        num2 = Math.floor(Math.random() * (10 - num1)) + 1;
      } else if (levelNum === 2) {
        // Up to 15
        num1 = Math.floor(Math.random() * 9) + 2;
        num2 = Math.floor(Math.random() * (15 - num1)) + 1;
      } else if (levelNum <= 4) {
        // Up to 20 crossing ten
        num1 = Math.floor(Math.random() * 8) + 6; // 6-13
        num2 = Math.floor(Math.random() * 7) + 4; // 4-10
      } else if (levelNum <= 7) {
        // Up to 50
        num1 = Math.floor(Math.random() * 30) + 10;
        num2 = Math.floor(Math.random() * 19) + 4;
      } else {
        // Up to 100
        const tens = [10, 20, 30, 40, 50];
        const isTen = Math.random() > 0.5;
        if (isTen) {
          num1 = tens[Math.floor(Math.random() * tens.length)];
          num2 = Math.floor(Math.random() * 40) + 5;
        } else {
          num1 = Math.floor(Math.random() * 45) + 15;
          num2 = Math.floor(Math.random() * 35) + 12;
        }
      }
      answer = num1 + num2;
      hintText = `Si a ${num1} le añades ${num2}, ¿cuánto te da?`;
      break;
    }

    case 'subtraction': {
      symbol = '−';
      if (levelNum === 1 || levelNum === 2) {
        // Up to 10
        answer = Math.floor(Math.random() * 6) + 1;
        num2 = Math.floor(Math.random() * 4) + 1;
        num1 = answer + num2;
      } else if (levelNum <= 4) {
        // Up to 20
        answer = Math.floor(Math.random() * 9) + 2;
        num2 = Math.floor(Math.random() * 8) + 3;
        num1 = answer + num2;
      } else if (levelNum <= 7) {
        // Up to 50
        answer = Math.floor(Math.random() * 25) + 5;
        num2 = Math.floor(Math.random() * 20) + 4;
        num1 = answer + num2;
      } else {
        // Up to 100
        answer = Math.floor(Math.random() * 50) + 10;
        num2 = Math.floor(Math.random() * 30) + 5;
        num1 = answer + num2;
      }
      hintText = `A ${num1} le quitamos ${num2}. ¿Cuánto queda?`;
      break;
    }

    case 'multiplication': {
      symbol = '×';
      let tablePool = [2, 3, 4, 5, 10];
      if (levelNum <= 4) {
        tablePool = [2, 5, 10];
      } else if (levelNum === 5) {
        tablePool = [2, 3, 4, 5];
      } else if (levelNum === 6) {
        tablePool = [3, 4, 6, 7];
      } else if (levelNum >= 7) {
        tablePool = [6, 7, 8, 9, 10];
      }

      num1 = tablePool[Math.floor(Math.random() * tablePool.length)];
      num2 = Math.floor(Math.random() * 9) + 2; // 2 to 10
      // 50% chance to swap num1 and num2 for visual variety
      if (Math.random() > 0.5) {
        const temp = num1;
        num1 = num2;
        num2 = temp;
      }
      answer = num1 * num2;
      hintText = `Es sumar ${num1} veces el número ${num2}.`;
      break;
    }

    case 'division': {
      symbol = '÷';
      let divisorPool = [2, 3, 4, 5];
      if (levelNum >= 8) {
        divisorPool = [2, 3, 4, 5, 6, 7, 8, 9, 10];
      }
      num2 = divisorPool[Math.floor(Math.random() * divisorPool.length)];
      answer = Math.floor(Math.random() * 9) + 2; // 2 to 10
      num1 = num2 * answer; // ensures clean exact division with no remainder
      hintText = `Repartir ${num1} entre ${num2} partes iguales.`;
      break;
    }
  }

  // Generate 3 distractors (total 4 bubbles for clean mobile layout)
  const distractors = generateSmartDistractors(answer, 3, 0, 150);
  const options = [answer, ...distractors].sort(() => Math.random() - 0.5);

  return {
    id: `prob-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    num1,
    num2,
    operation,
    symbol,
    answer,
    options,
    hintText,
  };
}
