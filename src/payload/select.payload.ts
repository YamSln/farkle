import { DieFace } from "../model/die-face.type";
import { DieIndex } from "../model/die-index.type";

export interface SelectPayload {
  jokerNumber: DieFace;
  potentialScore: number;
  dieIndex: DieIndex;
  selected: boolean;
}
