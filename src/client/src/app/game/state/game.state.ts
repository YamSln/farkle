import { GamePhase } from '../../../../../model/game.phase.model';
import { GameDTO } from '../../../../../model/game.dto';

export interface GameState extends GameDTO {
  playerId: string;
  selfIndex: number;
}

export const initialState: GameState = {
  playerId: '',
  roomId: '',
  selfIndex: 0,
  players: [{ host: true, id: '1', nick: 'aaa', points: 0 }],
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
