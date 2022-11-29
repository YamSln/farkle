import { DieFace } from "../model/die-face.type";

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDieFace = (): DieFace => {
  return getRandomNumber(1, 6) as DieFace;
};

export default {
  getRandomNumber,
  getRandomDieFace,
};
