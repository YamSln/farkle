import { DieFace } from "../model/die-face.type";
import { Die } from "../model/die.model";
import { JOKER_INDEX } from "../util/game.constants";

const mockDice = (...numbers: DieFace[]): Die[] => {
  return numbers.map((num, index) =>
    index !== JOKER_INDEX
      ? mockDie(num).build()
      : mockDie(num).makeJoker().build(),
  );
};

const mockDie = (num: DieFace): DieMock => {
  return new DieMock(num);
};

const mockHistogram = (joker: boolean, ...numbers: number[]) => {
  return { joker, numbers };
};

class DieMock {
  number: DieFace;
  selected: boolean = false;
  confirmed: boolean = false;
  joker: boolean = false;

  constructor(number: DieFace) {
    this.number = number;
  }

  select(): DieMock {
    this.selected = true;
    return this;
  }

  confirm(): DieMock {
    this.confirmed = true;
    return this;
  }

  makeJoker(): DieMock {
    this.joker = true;
    return this;
  }

  build(): Die {
    return {
      number: this.number,
      selected: this.selected,
      confirmed: this.confirmed,
      joker: this.joker,
      wasSelected: false,
      wasConfirmed: false,
    };
  }
}

export { mockDie, mockDice, mockHistogram };
