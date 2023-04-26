import { Die } from "./die.model";
import { GamePhase } from "./game.phase.model";
import { Player } from "./player.model";

export interface GameDTO {
  roomId: string;
  players: Player[];
  dice: Die[];
  currentThrowPicks: Die[][]; // Plays confirmed by current player
  currentTurnScores: number[];
  potentialScore: number;
  currentPlayer: number;
  gamePhase: GamePhase;
  bust: boolean;
  gameWon: boolean;
  allDiceConfirmed: boolean;
  // Timing
  turnTime: number;
  currentTime: number;
}
