import { ILLEGAL } from "../error/error.util";
import { DieIndex } from "../model/die-index.type";
import { Game, GameState } from "../model/game.model";
import { GamePhase } from "../model/game.phase.model";
import { Player } from "../model/player.model";
import { BankBustPayload } from "../payload/bankbust.payload";
import { ConfirmPayload } from "../payload/confirm.payload";
import { RollPayload } from "../payload/roll.payload";
import { SelectPayload } from "../payload/select.payload";

const newGame = (socketId: string, currentGame: GameState): GameState => {
  if (!currentGame.isHost(socketId)) {
    throw new Error(ILLEGAL);
  }
  return createGame(
    currentGame.password,
    currentGame.maxPlayers,
    currentGame.maxPoints,
    currentGame.players.map((player) => {
      return { ...player, points: 0 };
    }),
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

const roll = (socketId: string, state: GameState): RollPayload => {
  let rollPayload: RollPayload | null = null;
  if (
    !state.isPlaying(socketId) || // Player is not playing
    state.gamePhase !== GamePhase.ROLL || // Ilegal game phase
    state.gameWon ||
    !(rollPayload = state.roll()) // Unsuccessfull roll
  ) {
    throw new Error(ILLEGAL);
  }
  return { dice: [...state.dice], bust: rollPayload.bust };
};

const bankBust = (socketId: string, state: GameState): BankBustPayload => {
  let bankBustPayload: BankBustPayload | null = null;
  if (
    !state.isPlaying(socketId) ||
    (state.gamePhase !== GamePhase.ROLL &&
      state.gamePhase !== GamePhase.PICK) ||
    state.gameWon ||
    !(bankBustPayload = state.bankBust())
  ) {
    throw new Error(ILLEGAL);
  }
  return bankBustPayload;
};

const select = (
  socketId: string,
  state: GameState,
  dieIndex: DieIndex,
): SelectPayload => {
  let selectPayload: SelectPayload | null = null;
  if (
    !state.isPlaying(socketId) ||
    state.gamePhase !== GamePhase.PICK ||
    state.bust ||
    state.gameWon ||
    !(selectPayload = state.select(dieIndex))
  ) {
    throw new Error(ILLEGAL);
  }
  return selectPayload;
};

const confirm = (socketId: string, state: GameState): ConfirmPayload => {
  let confirmPayload: ConfirmPayload | null = null;
  if (
    !state.isPlaying(socketId) ||
    state.gamePhase !== GamePhase.PICK ||
    !(confirmPayload = state.confirm()) ||
    state.gameWon
  ) {
    throw new Error(ILLEGAL);
  }
  return confirmPayload;
};

export default {
  newGame,
  createGame,
  roll,
  bankBust,
  select,
  confirm,
};
