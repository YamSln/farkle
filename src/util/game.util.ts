import { DieFace } from "../model/die-face.type";

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDieFace = (): DieFace => {
  return getRandomNumber(1, 6) as DieFace;
};

const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const sumArray = (array: number[]): number => {
  return array.reduce((accumulator, current) => {
    return accumulator + current;
  });
};

export default {
  getRandomNumber,
  getRandomDieFace,
  shuffleArray,
  sumArray,
};
