import { DieFace } from "../model/die-face.type";

export interface SelectPayload {
  jokerNumber: DieFace;
  potentialScore: number;
}
