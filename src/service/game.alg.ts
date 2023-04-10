import { DieFace } from "../model/die-face.type";
import { Die } from "../model/die.model";
import { SelectPayload } from "../payload/select.payload";
import { JOKER_INDEX } from "../util/game.constants";

interface Histogram {
  array: number[];
  joker: number;
}

// before allowing player to select dice, the array goes through the bust check algo
const checkBust = (dice: Die[]): boolean => {
  const move_checker: Histogram = {
    array: ([] = [0, 0, 0, 0, 0, 0, 0]),
    joker: 0,
  };
  for (let i = 0; i < 6; i++) {
    if (!dice[i].confirmed) {
      move_checker.array[dice[i].number]++;
    }
  }

  if (move_checker.array[1] > 0 || move_checker.array[5] > 0) return false;
  for (let i = 2; i <= 6; i++) {
    if (i != 5 && move_checker.array[i] >= 3) return false;
  }
  return true;
};

// point calculation algorithm
const getPoints = (
  dice: Die[],
): { jokerNumber: DieFace; potentialScore: number } => {
  const histo: Histogram = {
    array: ([] = [0, 0, 0, 0, 0, 0, 0]),
    joker: 0,
  };
  let isJoker: boolean = false;
  for (let i = 0; i < 6; i++) {
    if (dice[i].selected) {
      if (dice[i].joker) {
        histo.joker = dice[i].number;
        if (dice[i].number === 1) {
          isJoker = true;
        }
      }
      histo.array[dice[i].number]++;
    }
  }
  const potentialScore: number = calculateScore(histo);
  return {
    jokerNumber: isJoker
      ? ((histo.joker || 1) as DieFace)
      : dice[JOKER_INDEX].number,
    potentialScore,
  };
};

const calculateScore = (histo: Histogram): number => {
  let numberOfDice;
  let score = 0;
  numberOfDice = dicesInPlay(histo);
  if (numberOfDice >= 5) {
    //Checks for series and returns the score otherwise returns 0
    score = calcSeries(histo, numberOfDice);
    if (score > 0) {
      return score;
    }
  }
  //Checks for Triplets and over otherwise returns 0
  score = calcCombination(histo, numberOfDice);
  if (score > 0) {
    return score;
  }
  return 0;
};

const dicesInPlay = (histo: Histogram): number => {
  //returns the amount of dice selected (in play atm)
  let amountOfDice = 0;
  for (let i = 1; i <= 6; i++) amountOfDice += histo.array[i];
  return amountOfDice;
};

const calcSeries = (histo: Histogram, numberOfDice: number): number => {
  let holeN1 = 0;
  let holeN2 = 0;
  if (numberOfDice == 5) {
    let length = 0;
    for (let i = 1; i <= 6; i++) {
      if (histo.array[i] > 0) length++;
      else {
        length = 0;
        if (holeN1 == 0) holeN1 = i;
        else if (holeN2 == 0) holeN2 = i;
        // 2 holes that one of them isnt a 6 cant be a series even with joker help
        if (holeN2 != 6 && holeN2 != 0) return 0;
      }
      if (length == 5) break;
    }
    if (histo.joker != 1) {
      if (length == 5 && histo.array[6] == 1) return 750;
      else if (length == 5) return 500;
      return 0;
    } //joker is in play!
    else {
      histo.array[1]--;
      if (length == 5) {
        histo.array[6]++;
        histo.joker = 6;
        return 750;
      } //2 gaps only possible option
      else if (holeN2 == 6 && holeN1 > 0) {
        histo.array[holeN1]++;
        histo.joker = holeN1;
        return 500;
      } //have one gap somewhere - not 6
      else {
        histo.array[holeN1]++;
        histo.joker = holeN1;
        return 750;
      }
    }
  } //6 dice in play!
  else {
    let holeCount = 0;
    for (let i = 1; i <= 6; i++) {
      {
        if (histo.array[i] >= 2 && i != 5 && i != 1)
          //Series not possible in this case
          return 0;
        if (histo.array[i] == 0) {
          holeCount++;
          if (holeN1 == 0) holeN1 = i;
          else if (holeN2 == 0) holeN2 = i;
          else return 0; //Series not possible with 3 "holes"/"gaps" , with 2 holes and a joker its still possible
        }
      }
    }

    if (holeCount == 0) return 1500;

    if (histo.joker != 1) {
      //No joker in play
      if (holeCount > 1) {
        //Series not possible with 2 gaps and no joker!
        return 0;
      }
      if (holeN1 == 1) {
        return 800; //this means there is an EXTRA 5 so 750 + 50 = 800
      }
      if (holeN1 == 6) {
        //this means there is an EXTRA 5 or a 1 so check if return 600 for 1 or 550 for 5
        if (histo.array[1] == 2) return 600;
        else return 550;
      }
      return 0;
    } // Joker is in play
    else {
      histo.array[1]--;
      if (holeCount == 1) {
        histo.joker = holeN1;
        histo.array[holeN1]++;
        if (histo.array[1] == 1)
          //still have a 1 without the joker so the joker fills the gap and have a full series
          return 1500;
        //no extra 1 so there must be 2 5's so big small series and a 5 750 + 50 = 800
        return 800;
      } // 2 "holes"/"gaps"
      else {
        if (holeN2 != 6 || histo.array[1] == 0) return 0;
        if (holeN2 == 6 && histo.array[1] > 0) {
          histo.joker = holeN1;
          histo.array[holeN1]++;
          if (histo.array[1] == 1) return 550;
          else return 600;
        }
      }
    }
  }
  return 0;
};

const calcCombination = (histo: Histogram, numberOfDice: number): number => {
  // here calculations will be made in case move was valid and wasnt a series.
  let legitMove: boolean = true;
  let jokerWasUsed: boolean = false;
  let changeJokerTo = 0;
  let score = 0;
  if (histo.joker != 1) jokerWasUsed = true;
  for (let i = 6; i >= 2; i--) {
    if (i != 5) {
      if (histo.array[i] == 1 || (histo.array[i] == 2 && jokerWasUsed)) {
        legitMove = false;
      } else if (histo.array[i] == 2 && !jokerWasUsed) {
        changeJokerTo = i;
        jokerWasUsed = true;
      }
    }
    if (!legitMove) {
      return 0;
    }
  }
  if (histo.joker != 1) {
    //No joker in play!
    score = makeCalculation(histo);
    return score;
  }
  if (histo.joker == 1) {
    //Joker in play
    histo.array[1]--;
    if (changeJokerTo != 0) {
      //Joker had to change for the move to be valid so changing it to the value needed
      histo.array[changeJokerTo]++;
      histo.joker = changeJokerTo;
      score = makeCalculation(histo);
      return score;
    } // Joker didnt need to change to validate the move so changing it for maximum point output instead
    else {
      if (numberOfDice <= 3) {
        //want to make the joker 1 again since it will maximize points except for one case when I have 2 5's
        if (histo.array[5] == 2) {
          histo.array[5]++;
          histo.joker = 5;
        } else histo.array[1]++;
      }
      //more than 3 dice
      else if (histo.array[1] >= 2) histo.array[1]++;
      else {
        for (let i = 6; i >= 2; i--) {
          if (histo.array[i] >= 2) {
            histo.array[i]++;
            histo.joker = i;
            break;
          }
        }
      }
      score = makeCalculation(histo);
      return score;
    }
  }
  return 0;
};

const makeCalculation = (histo: Histogram): number => {
  //final score calculations after validation (combination not series)
  let score = 0;
  for (let i = 1; i <= 6; i++) {
    switch (histo.array[i]) {
      case 0:
        break;
      case 1: {
        if (i == 5) score += 50;
        else score += 100;
        break;
      }
      case 2: {
        if (i == 5) score += 100;
        else score += 200;
        break;
      }
      case 3: {
        if (i == 1) score += 1000;
        else score += 100 * i;
        break;
      }
      case 4: {
        if (i == 1) score += 2000;
        else score += 200 * i;
        break;
      }
      case 5: {
        if (i == 1) score += 4000;
        else score += 400 * i;
        break;
      }
      case 6: {
        if (i == 1) score += 8000;
        else score += 800 * i;
        break;
      }
    }
  }
  return score;
};

export const alg = {
  getPoints,
  checkBust,
};

export const algTest = {
  getPoints,
  checkBust,
  calculateScore,
  makeCalculation,
  calcSeries,
  calcCombination,
  dicesInPlay,
};
