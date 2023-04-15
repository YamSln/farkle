import { ILLEGAL } from "../error/error.util";
import { GameEvent } from "../event/game.event";
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
  currentGame.clearTimer(true);
  const newGame = createGame(
    currentGame.password,
    currentGame.maxPlayers,
    currentGame.maxPoints,
    currentGame.players.map((player) => {
      return { ...player, points: 0 };
    }),
  );
  newGame.roomId = currentGame.roomId;
  return newGame;
};

const createGame = (
  password: string,
  maxPlayers: number,
  maxPoints: number,
  players: Player[] = [],
): GameState => {
  return new Game(password, players, maxPoints, maxPlayers);
};

const startGame = (socketId: string, state: GameState, io: any): Player[] => {
  let players: Player[] | null = null;
  if (!state.isHost(socketId) || !(players = state.start())) {
    throw new Error(ILLEGAL);
  }
  if (state.turnTime) {
    startTimer(state, io);
  }
  return players;
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

const setTime = (
  socketId: string,
  state: GameState,
  timeSpan: number,
  io: any,
): number => {
  if (!state.isHost(socketId)) {
    throw new Error(ILLEGAL);
  }
  state.turnTime = timeSpan;
  // Timer cam only run when picking
  if (
    (state.gamePhase === GamePhase.PICK ||
      state.gamePhase === GamePhase.ROLL) &&
    !state.gameWon
  ) {
    startTimer(state, io);
  }
  return timeSpan;
};

const startTimer = (state: GameState, io: any): void => {
  if (state.turnTime === 0) {
    state.clearTimer(true);
  }
  state.currentTime = state.turnTime;
  // Clear timer interval
  state.clearTimer(false);
  if (state.turnTime > 0) {
    state.turnInterval = setInterval(() => {
      state.currentTime--;
      if (state.currentTime >= 0) {
        // Timer ticking
        io.to(state.roomId).emit(GameEvent.TIME_TICK, state.currentTime);
      } else {
        // TimeOut - reset timer and change turn
        const nextPlayerIndex: number = state.timeout();
        state.resetCurrentTimer();
        io.to(state.roomId).emit(GameEvent.TIME_OUT, nextPlayerIndex);
      }
    }, 1000);
  }
};

const resetTurn = (state: GameState): number => {
  return state.resetTurn();
};

export default {
  newGame,
  createGame,
  startGame,
  roll,
  bankBust,
  select,
  confirm,
  setTime,
  resetTurn,
};
