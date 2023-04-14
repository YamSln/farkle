import { Die } from 'src/app/model/die.model';
import { Player } from 'src/app/model/player.model';
import { GamePhase } from '../../../../../model/game.phase.model';

export interface GameState {
  playerId: string;
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
  playerId: '',
  roomId: '',
  selfIndex: 0,
  password: '',
  maxPlayers: 2,
  maxPoints: 3000,
  players: [
    { host: true, id: '1', nick: 'bob', points: 0 },
    { host: false, id: '1', nick: 'jam', points: 0 },
    { host: false, id: '1', nick: 'niv', points: 0 },
  ],
  dice: [
    {
      number: 1,
      selected: false,
      confirmed: true,
      joker: false,
      wasSelected: false,
      wasConfirmed: true,
    },
    {
      number: 1,
      selected: false,
      confirmed: true,
      joker: false,
      wasSelected: false,
      wasConfirmed: true,
    },
    {
      number: 1,
      selected: false,
      confirmed: true,
      joker: false,
      wasSelected: false,
      wasConfirmed: true,
    },
    {
      number: 1,
      selected: false,
      confirmed: true,
      joker: false,
      wasSelected: false,
      wasConfirmed: true,
    },
    {
      number: 1,
      selected: false,
      confirmed: true,
      joker: false,
      wasSelected: false,
      wasConfirmed: true,
    },
    {
      number: 1,
      selected: false,
      confirmed: true,
      joker: true,
      wasSelected: false,
      wasConfirmed: true,
    },
  ],
  currentThrowPicks: [
    [
      {
        number: 1,
        selected: false,
        confirmed: true,
        joker: false,
        wasSelected: false,
        wasConfirmed: true,
      },
      {
        number: 1,
        selected: false,
        confirmed: true,
        joker: false,
        wasSelected: false,
        wasConfirmed: true,
      },
    ],
  ],
  currentTurnScores: [100],
  potentialScore: 0,
  currentPlayer: 0,
  gamePhase: GamePhase.ROLL,
  bust: false,
  gameWon: false,
  allDiceConfirmed: false,
  turnTime: 0,
  currentTime: 0,
};
