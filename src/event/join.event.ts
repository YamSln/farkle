import { GameDTO } from "../model/game.dto";
import { Player } from "../model/player.model";

export interface JoinEvent {
  state: GameDTO;
  player: Player;
}
