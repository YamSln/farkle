import { GameState } from "../model/game.model";
import { Player } from "../model/player.model";

export interface JoinEvent {
  state: GameState;
  joined: Player;
}
