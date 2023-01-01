import { DieFace } from "./die-face.type";
import util from "../util/game.util";

export interface Die {
  number: DieFace;
  selected: boolean;
  confirmed: boolean;
  joker: boolean;
}

export const getRandomDie = (joker: boolean): Die => {
  return {
    joker,
    number: util.getRandomDieFace(),
    selected: false,
    confirmed: false,
  };
};

export const getRandomDice = (numberOfDice: number): Die[] => {
  const dice: Die[] = [];
  for (let i = 0; i < numberOfDice - 1; i++) {
    dice.push(getRandomDie(false));
  }
  dice[numberOfDice - 1] = getRandomDie(true);
  return dice;
};
