import { DieFace } from '../../../../model/die-face.type';

export interface Die {
  number: DieFace;
  selected: boolean;
  confirmed: boolean;
  joker: boolean;
  wasSelected: boolean;
  wasConfirmed: boolean;
}
