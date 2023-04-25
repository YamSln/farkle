import { DieIndex } from "../model/die-index.type";
import { Die } from "../model/die.model";

export interface ConfirmPayload {
  currentThrowScore: number;
  currentThrowPick: Die[];
  diceIndices: DieIndex[];
  allDiceConfirmed: boolean;
}
