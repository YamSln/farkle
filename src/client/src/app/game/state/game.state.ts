import { Die } from 'src/app/model/die.model';
import { Player } from 'src/app/model/player.model';

export interface GameState {
  roomId: string;
  participants: Player[];
  dice: Die[];
  blueTeamPoints: number;
  redTeamPoints: number;
  turnTime: number;
  currentTime: number;
  maxPlayers: number;
  playerId: string;
}

export const initialState: GameState = {
  roomId: '',
  participants: [],
  dice: [],
  blueTeamPoints: 0,
  redTeamPoints: 0,
  turnTime: 0,
  currentTime: 0,
  maxPlayers: 4,
  playerId: '',
};
