import { GameState } from "../model/game.model";
import { v4 as uuidv4 } from "uuid";
import service from "./game.service";
import { Player } from "../model/player.model";
import { JoinPayload } from "../model/join.payload";
import { JoinEvent } from "../event/join.event";
import jwt from "../auth/jwt.manager";
import {
  INCORRECT_PASSWORD,
  ROOM_FULL,
  NOT_FOUND,
  NICK_TAKEN,
  GAME_STARTED,
  ILLEGAL,
} from "../error/error.util";
import { CreateGamePayload } from "../model/create-game.payload";
import { PlayerAction } from "../model/player.action.payload";
import log from "../config/log";
import { GamePhase } from "../model/game.phase.model";
import { DieIndex } from "../model/die-index.type";
import { RollPayload } from "../payload/roll.payload";
import { SelectPayload } from "../payload/select.payload";
import { ConfirmPayload } from "../payload/confirm.payload";
import { BankBustPayload } from "../payload/bankbust.payload";
const REQUESTOR = "GAME_HANDLER";

const rooms: Map<string, GameState> = new Map<string, GameState>();

const createGame = (
  nick: string,
  password: string,
  maxPlayers: number,
  maxPoints: number,
): string => {
  const room = uuidv4();
  return jwt.generateJwt({
    room,
    nick,
    password,
    maxPlayers,
    maxPoints,
  });
};

const joinGame = (joinPayload: JoinPayload): string => {
  const state = getGame(joinPayload.room);
  if (state.password !== joinPayload.password) {
    throw new Error(INCORRECT_PASSWORD);
  } // Verify room has more slots
  if (state.players.length >= state.maxPlayers) {
    throw new Error(ROOM_FULL);
  } // Check if game started
  if (state.gamePhase !== GamePhase.WAIT) {
    throw new Error(GAME_STARTED);
  } // Check nick availability
  for (let player of state.players) {
    if (player.nick === joinPayload.nick) {
      throw new Error(NICK_TAKEN);
    }
  } // Generate token
  return jwt.generateJwt(joinPayload);
};

const onCreateGame = (
  socketId: string,
  createGamePayload: CreateGamePayload,
): GameState => {
  const host: Player = {
    id: socketId,
    nick: createGamePayload.nick,
    points: 0,
    host: true,
  };
  const state = service.createGame(
    createGamePayload.password,
    createGamePayload.maxPlayers,
    createGamePayload.maxPoints,
    [host],
  );
  state.roomId = createGamePayload.room;
  rooms.set(createGamePayload.room, state);
  log.info(REQUESTOR, `Room ${createGamePayload.room} created`);
  return state;
};

const onJoinGame = (socketId: string, joinPayload: JoinPayload): JoinEvent => {
  const state = getGame(joinPayload.room);
  // Verify room existence and password validity
  if (!state || state.password !== joinPayload.password) {
    throw new Error(NOT_FOUND);
  }
  // Create player
  const joined: Player = {
    id: socketId,
    nick: joinPayload.nick,
    points: 0,
    host: false,
  };
  state.players.push(joined);
  return { state, joined };
};

const onGameStart = (socketId: string, room: string, io: any): Player[] => {
  const state = getGame(room);
  const players: Player[] = service.startGame(socketId, state, io);
  return players;
};

const onNewGame = (socketId: string, room: string): GameState => {
  const state = getGame(room);
  const newGame = service.newGame(socketId, state);
  rooms.set(room, newGame);
  return newGame;
};

const onTimerSet = (
  socketId: string,
  room: string,
  timeSpan: number,
  io: any,
): number => {
  const state = getGame(room);
  return service.setTime(socketId, state, timeSpan, io);
};

const onBankBust = (socketId: string, room: string): BankBustPayload => {
  const state = getGame(room);
  return service.bankBust(socketId, state);
};

const onRoll = (socketId: string, room: string): RollPayload => {
  const state = getGame(room);
  return service.roll(socketId, state);
};

const onSelect = (
  socketId: string,
  room: string,
  dieIndex: DieIndex,
): SelectPayload => {
  const state = getGame(room);
  return service.select(socketId, state, dieIndex);
};

const onConfirm = (socketId: string, room: string): ConfirmPayload => {
  const state = getGame(room);
  return service.confirm(socketId, state);
};

const clearTimer = (state: GameState, erase: boolean = false): void => {
  if (state.turnInterval) {
    clearInterval(state.turnInterval);
  }
  if (erase) {
    state.turnTime = 0;
    state.currentTime = 0;
  }
};

const onDisconnectGame = (
  socketId: string,
  room: string,
): PlayerAction | null => {
  try {
    const state = getGame(room);
    const playerAction: PlayerAction | null = service.disconnect(
      socketId,
      state,
    );
    if (!playerAction) {
      rooms.delete(room);
      log.info(REQUESTOR, `Room ${room} removed`);
      return null;
    }
    return playerAction;
  } catch (err) {
    return null;
  }
};

const getGame = (room: string): GameState => {
  const state = rooms.get(room);
  if (!state) {
    throw new Error(NOT_FOUND);
  }
  return state;
};

export default {
  createGame,
  joinGame,
  onGameStart,
  onCreateGame,
  onJoinGame,
  onTimerSet,
  onNewGame,
  onDisconnectGame,
  onBankBust,
  onRoll,
  onSelect,
  onConfirm,
};

export const handlerTest = {
  getGame,
  rooms,
};
