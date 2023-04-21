import { DieFace } from "../model/die-face.type";

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 6;

export const MIN_POINTS = 3000;
export const MAX_POINTS = 12000;

export const DICE_COUNT = 6;

export const JOKER_INDEX = 5;

export const ONE_OF_ONE = 100;
export const TWO_OF_ONE = 200;
export const THREE_OF_ONE = 1000;
export const FOUR_OF_ONE = 2000;
export const FIVE_OF_ONE = 4000;
export const SIX_OF_ONE = 8000;

export const THREE_OF_TWO = 200;
export const FOUR_OF_TWO = 400;
export const FIVE_OF_TWO = 800;
export const SIX_OF_TWO = 1600;

export const THREE_OF_THREE = 300;
export const FOUR_OF_THREE = 600;
export const FIVE_OF_THREE = 1200;
export const SIX_OF_THREE = 2400;

export const THREE_OF_FOUR = 400;
export const FOUR_OF_FOUR = 800;
export const FIVE_OF_FOUR = 1600;
export const SIX_OF_FOUR = 3200;

export const ONE_OF_FIVE = 50;
export const TWO_OF_FIVE = 100;
export const THREE_OF_FIVE = 500;
export const FOUR_OF_FIVE = 1000;
export const FIVE_OF_FIVE = 2000;
export const SIX_OF_FIVE = 4000;

export const THREE_OF_SIX = 600;
export const FOUR_OF_SIX = 1200;
export const FIVE_OF_SIX = 2400;
export const SIX_OF_SIX = 4800;

interface DieScore {
  number: DieFace;
  scores: (number | null)[];
}

export const DICE_SCORES: DieScore[] = [
  {
    number: 1,
    scores: [
      ONE_OF_ONE,
      TWO_OF_ONE,
      THREE_OF_ONE,
      FOUR_OF_ONE,
      FIVE_OF_ONE,
      SIX_OF_ONE,
    ],
  },
  {
    number: 2,
    scores: [null, null, THREE_OF_TWO, FOUR_OF_TWO, FIVE_OF_TWO, SIX_OF_TWO],
  },
  {
    number: 3,
    scores: [
      null,
      null,
      FOUR_OF_THREE,
      FOUR_OF_THREE,
      FIVE_OF_THREE,
      SIX_OF_THREE,
    ],
  },
  {
    number: 4,
    scores: [
      null,
      null,
      THREE_OF_FOUR,
      FOUR_OF_FOUR,
      FIVE_OF_FOUR,
      SIX_OF_FOUR,
    ],
  },
  {
    number: 5,
    scores: [
      ONE_OF_FIVE,
      TWO_OF_FIVE,
      THREE_OF_FIVE,
      FOUR_OF_FIVE,
      FIVE_OF_FIVE,
      SIX_OF_FIVE,
    ],
  },
  {
    number: 6,
    scores: [null, null, THREE_OF_SIX, FOUR_OF_SIX, FIVE_OF_SIX, SIX_OF_SIX],
  },
];
