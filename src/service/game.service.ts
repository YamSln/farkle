import { DieIndex } from "../model/die-index.type";
import { Game, GameState } from "../model/game.model";
import { GamePhase } from "../model/game.phase.model";
import { Player } from "../model/player.model";
import { RollPayload } from "../payload/roll.payload";
import { SelectPayload } from "../payload/select.payload";

const newGame = (currentGame: GameState): GameState => {
  return createGame(
    currentGame.password,
    currentGame.maxPlayers,
    currentGame.maxPoints,
    currentGame.players,
  );
};

const createGame = (
  password: string,
  maxPlayers: number,
  maxPoints: number,
  players: Player[] = [],
): GameState => {
  return new Game(password, players, maxPoints, maxPlayers);
};

const roll = (socketId: string, state: GameState): RollPayload | null => {
  if (!state.isPlaying(socketId)) {
    return null;
  }
  const rollPayload: RollPayload | null = state.roll();
  return rollPayload ? { dice: [...state.dice], bust: state.bust } : null;
};

const bank = (socketId: string, state: GameState): number | null => {
  if (!state.isPlaying(socketId)) {
    return null;
  }
  return state.bank();
};

const select = (
  socketId: string,
  state: GameState,
  dieIndex: DieIndex,
): SelectPayload | null => {
  if (!state.isPlaying(socketId) || state.gamePhase !== GamePhase.PICK) {
    return null;
  }
  return state.select(dieIndex);
};

export default {
  newGame,
  createGame,
  roll,
  bank,
  select,
};
