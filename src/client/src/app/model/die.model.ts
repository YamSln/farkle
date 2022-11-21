import { DieFace } from './die-face.type';

export interface Die {
  number: DieFace;
  selected: boolean;
  confirmed: boolean;
  joker: boolean;
}
