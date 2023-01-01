import { Die } from "../model/die.model";

export interface RollPayload {
  dice: Die[];
  bust: boolean;
}
