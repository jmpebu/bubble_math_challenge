import { PuppySticker } from '../types/game';

// Direct ES Module imports so Vite bundles and resolves the assets in both dev and production build
import puppyPoliceImg from '../assets/images/puppy_police_badge_1792666778914.jpg';
import puppyPilotImg from '../assets/images/puppy_pilot_badge_1792666779247.jpg';
import puppyFireImg from '../assets/images/puppy_fire_badge_1792666780357.jpg';
import puppyBuilderImg from '../assets/images/puppy_builder_badge_1792666780444.jpg';
import puppySnowImg from '../assets/images/puppy_snow_badge_1792666797688.jpg';
import puppyWaterImg from '../assets/images/puppy_water_badge_1792666797788.jpg';
import puppyHeroImg from '../assets/images/puppy_superhero_badge_1792666798225.jpg';

export const PUPPY_STICKERS: PuppySticker[] = [
  {
    id: 'chase_police',
    name: 'Chase el Policía',
    role: 'Líder de la Patrulla',
    catchphrase: '¡Chase se hará cargo de los números!',
    image: puppyPoliceImg,
    bgColor: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-400',
    unlockCondition: '¡Desbloqueado desde el inicio para acompañarte!',
    unlockedLevelRequirement: 1,
  },
  {
    id: 'skye_pilot',
    name: 'Skye la Piloto',
    role: 'Rescate Aéreo',
    catchphrase: '¡A volar alto con las sumas!',
    image: puppyPilotImg,
    bgColor: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    unlockCondition: 'Completa con éxito el Nivel 2',
    unlockedLevelRequirement: 2,
  },
  {
    id: 'marshall_fire',
    name: 'Marshall el Bombero',
    role: 'Rescate y Emergencias',
    catchphrase: '¡Listo para apagar cualquier duda matemática!',
    image: puppyFireImg,
    bgColor: 'from-red-500 to-orange-500',
    borderColor: 'border-red-400',
    unlockCondition: 'Completa con éxito el Nivel 4',
    unlockedLevelRequirement: 4,
  },
  {
    id: 'rubble_builder',
    name: 'Rubble el Constructor',
    role: 'Construcción y Fuerza',
    catchphrase: '¡Rubble a toda máquina multiplicando!',
    image: puppyBuilderImg,
    bgColor: 'from-amber-400 to-yellow-500',
    borderColor: 'border-yellow-300',
    unlockCondition: 'Completa con éxito el Nivel 6',
    unlockedLevelRequirement: 6,
  },
  {
    id: 'everest_snow',
    name: 'Everest de las Nieves',
    role: 'Rescate en la Nieve',
    catchphrase: '¡Nieve o hielo, nada me detiene en los cálculos!',
    image: puppySnowImg,
    bgColor: 'from-teal-400 to-cyan-500',
    borderColor: 'border-teal-300',
    unlockCondition: 'Consigue una racha de 6 aciertos seguidos',
    unlockedStreakRequirement: 6,
  },
  {
    id: 'zuma_water',
    name: 'Zuma el Buzo',
    role: 'Rescate Acuático',
    catchphrase: '¡Al agua patos, división completada!',
    image: puppyWaterImg,
    bgColor: 'from-orange-500 to-amber-600',
    borderColor: 'border-orange-400',
    unlockCondition: 'Completa con éxito el Nivel 8',
    unlockedLevelRequirement: 8,
  },
  {
    id: 'super_hero_pup',
    name: 'Súper Cachorro Dorado',
    role: 'Gran Maestra de Burbujas',
    catchphrase: '¡Eres una superheroína de las matemáticas!',
    image: puppyHeroImg,
    bgColor: 'from-yellow-300 via-amber-400 to-yellow-600',
    borderColor: 'border-amber-300',
    unlockCondition: '¡Completa el Nivel 10 y domina el desafío!',
    unlockedLevelRequirement: 10,
  },
];
