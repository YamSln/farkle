import { Player } from './player.model';

export interface PlayerAction {
  nick: string;
  updatedPlayers: Player[];
  reset: boolean;
  playerIndex: number;
}
