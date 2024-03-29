import {
  GAME_STARTED,
  ILLEGAL,
  INCORRECT_PASSWORD,
  NICK_TAKEN,
  NOT_FOUND,
  ROOM_FULL,
} from "../error/error.util";
import { GameEvent } from "../event/game.event";
import { JoinEvent } from "../event/join.event";
import { DieIndex } from "../model/die-index.type";
import { Game, GameState, transferable } from "../model/game.model";
import { GamePhase } from "../model/game.phase.model";
import { PlayerAction } from "../model/player.action.payload";
import { Player } from "../model/player.model";
import { BankBustPayload } from "../payload/bankbust.payload";
import { ConfirmPayload } from "../payload/confirm.payload";
import { CreateGamePayload } from "../payload/create-game.payload";
import { JoinPayload } from "../payload/join.payload";
import { RollPayload } from "../payload/roll.payload";
import { SelectPayload } from "../payload/select.payload";

const newGame = (socketId: string, currentGame: GameState): GameState => {
  // Only the host can start a new game
  if (!currentGame.isHost(socketId)) {
    throw new Error(ILLEGAL);
  }
  currentGame.clearTimer(true); // Just in case to avoid memory leak
  const newGame = freshGame(
    currentGame.password,
    currentGame.maxPlayers,
    currentGame.maxPoints,
    // Reset players points
    currentGame.players.map((player) => {
      return { ...player, points: 0 };
    }),
  );
  newGame.roomId = currentGame.roomId;
  return newGame;
};

const joinGame = (
  playerId: string,
  state: GameState,
  joinPayload: JoinPayload,
): JoinEvent => {
  if (!state || state.password !== joinPayload.password) {
    throw new Error(NOT_FOUND);
  }
  const player: Player = {
    id: playerId,
    nick: joinPayload.nick,
    points: 0,
    host: false,
  };
  state.players.push(player);
  return { state: transferable(state), player };
};

const verifyJoinPayload = (
  state: GameState,
  joinPayload: JoinPayload,
): boolean => {
  if (state.password !== joinPayload.password) {
    throw new Error(INCORRECT_PASSWORD);
  }
  if (state.players.length >= state.maxPlayers) {
    throw new Error(ROOM_FULL);
  }
  if (state.gamePhase !== GamePhase.WAIT) {
    throw new Error(GAME_STARTED);
  }
  for (let player of state.players) {
    if (player.nick === joinPayload.nick) {
      throw new Error(NICK_TAKEN);
    }
  }
  return true;
};

const createGame = (
  hostId: string,
  createGamePayload: CreateGamePayload,
): GameState => {
  const host: Player = {
    id: hostId,
    nick: createGamePayload.nick,
    points: 0,
    host: true,
  };
  const state = freshGame(
    createGamePayload.password,
    createGamePayload.maxPlayers,
    createGamePayload.maxPoints,
    [host],
  );
  state.roomId = createGamePayload.roomId;
  return state;
};

const freshGame = (
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

const disconnect = (
  socketId: string,
  state: GameState,
): PlayerAction | null => {
  const index = state.playerIndex(socketId);
  if (index !== -1) {
    // Remove the player that left
    const player = state.players[index];
    const currentPlayer = state.players[state.currentPlayer];
    state.players.splice(index, 1);
    const numberOfPlayers = state.players.length;
    // Game is empty
    if (numberOfPlayers === 0) {
      state.clearTimer(true);
      return null;
    } // Reset turn if the current player left
    let playerIndex: number = -1;
    if (state.currentPlayer === index) {
      playerIndex = state.resetTurn();
    } else {
      state.currentPlayer = state.playerIndex(currentPlayer.id);
    }
    // If host left set a new one
    if (player.host) {
      state.players[index >= numberOfPlayers ? 0 : index].host = true;
    }
    return {
      nick: player.nick,
      updatedPlayers: Array.from(state.players),
      reset: playerIndex !== -1,
      playerIndex: state.currentPlayer,
    };
  }
  return null;
};

export default {
  newGame,
  verifyJoinPayload,
  joinGame,
  freshGame,
  createGame,
  startGame,
  roll,
  bankBust,
  select,
  confirm,
  setTime,
  disconnect,
};
