import { Die } from "./die.model";
import { GamePhase } from "./game.phase.model";
import { Player } from "./player.model";

export interface GameState {
  roomId?: string;
  players: Player[];
  dice: Die[];
  currentThrowPicks: Die[][];
  currentTurnScore: number;
  currentPlayer: number;
  gamePhase: GamePhase;
  turnTime: number;
  currentTime: number;
  turnInterval?: NodeJS.Timeout;
  password: string;
  maxPlayers: number;
  maxPoints: number;
  winningPlayer?: string;
}
