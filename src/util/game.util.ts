import { DieFace } from "../model/die-face.type";

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDieFace = (): DieFace => {
  return getRandomNumber(1, 6) as DieFace;
};

const shuffleArray = <T>(array: T[]): T[] => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex != 0) {
    // Get random remaining
    randomIndex = getRandomNumber(0, currentIndex);
    currentIndex--;
    // Swap
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
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
