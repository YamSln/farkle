import { Player } from 'src/app/model/player.model';

export const findSelf = (players: Player[], playerId: string) => {
  return players.findIndex((player) => player.id === playerId);
};
