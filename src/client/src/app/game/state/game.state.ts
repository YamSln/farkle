import { Die } from 'src/app/model/die.model';
import { Player } from 'src/app/model/player.model';
import { GamePhase } from '../../../../../model/game.phase.model';

export interface GameState {
  roomId: string;
  selfIndex: number;
  password: string;
  maxPlayers: number;
  maxPoints: number;
  // Game fields
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

export const initialState: GameState = {
  roomId: '',
  selfIndex: 0,
  password: '',
  maxPlayers: 2,
  maxPoints: 3000,
  players: [],
  dice: [],
  currentThrowPicks: [],
  currentTurnScores: [],
  potentialScore: 0,
  currentPlayer: 0,
  gamePhase: GamePhase.WAIT,
  bust: false,
  gameWon: false,
  allDiceConfirmed: false,
  turnTime: 0,
  currentTime: 0,
};
