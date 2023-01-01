import { DieIndex } from "../model/die-index.type";
import { Die } from "../model/die.model";
import { Game, GameState } from "../model/game.model";
import { Player } from "../model/player.model";
import { RollPayload } from "../payload/roll.payload";
import { SelectPayload } from "../payload/select.payload";
import { JOKER_INDEX } from "../util/game.constants";

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

const roll = (socketId: string, state: GameState): RollPayload => {
  if (!state.isPlaying(socketId)) {
    return { dice: [...state.dice], bust: state.bust };
  }
  const rollPayload: RollPayload | null = state.roll();
  if (!rollPayload) {
    return { dice: [...state.dice], bust: state.bust };
  }
  return rollPayload;
};

const select = (
  socketId: string,
  state: GameState,
  dieIndex: DieIndex
): SelectPayload => {
  if (!state.isPlaying(socketId)) {
    return {
      jokerNumber: state.dice[JOKER_INDEX].number,
      potentialScore: state.potentialScore,
    };
  }
  return state.select(dieIndex);
};

export default {
  newGame,
  createGame,
  roll,
  select,
};
