import { Game, GameState } from "../model/game.model";
import { Player } from "../model/player.model";

const newGame = (currentGame: GameState): GameState => {
  return createGame(
    currentGame.password,
    currentGame.maxPlayers,
    currentGame.maxPoints,
    currentGame.players
  );
};

const createGame = (
  password: string,
  maxPlayers: number,
  maxPoints: number,
  players: Player[] = []
): GameState => {
  return new Game(password, players, maxPoints, maxPlayers);
};

export default {
  newGame,
  createGame,
};
