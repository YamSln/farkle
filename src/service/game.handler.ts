import { GameState, transferable } from "../model/game.model";
import { v4 as uuidv4 } from "uuid";
import service from "./game.service";
import { Player } from "../model/player.model";
import { JoinPayload } from "../payload/join.payload";
import { JoinEvent } from "../event/join.event";
import jwt from "../auth/jwt.manager";
import { NOT_FOUND } from "../error/error.util";
import { CreateGamePayload } from "../payload/create-game.payload";
import { PlayerAction } from "../model/player.action.payload";
import log from "../config/log";
import { DieIndex } from "../model/die-index.type";
import { RollPayload } from "../payload/roll.payload";
import { SelectPayload } from "../payload/select.payload";
import { ConfirmPayload } from "../payload/confirm.payload";
import { BankBustPayload } from "../payload/bankbust.payload";
import { GameDTO } from "../model/game.dto";
const REQUESTOR = "GAME_HANDLER";

const rooms: Map<string, GameState> = new Map<string, GameState>();

const createGame = (
  nick: string,
  password: string,
  maxPlayers: number,
  maxPoints: number,
): string => {
  const roomId: string = uuidv4(); // New room id
  return jwt.generateJwt({
    roomId,
    nick,
    password,
    maxPlayers,
    maxPoints,
  });
};

const joinGame = (joinPayload: JoinPayload): string => {
  const state: GameState = getGame(joinPayload.roomId);
  service.verifyJoinPayload(state, joinPayload);
  return jwt.generateJwt(joinPayload);
};

const onCreateGame = (
  socketId: string,
  createGamePayload: CreateGamePayload,
): GameDTO => {
  const state: GameState = service.createGame(socketId, createGamePayload);
  rooms.set(createGamePayload.roomId, state); // Save rooms game state
  log.info(REQUESTOR, `Room ${state.roomId} created`);
  return transferable(state);
};

const onJoinGame = (socketId: string, joinPayload: JoinPayload): JoinEvent => {
  const state: GameState = getGame(joinPayload.roomId);
  return service.joinGame(socketId, state, joinPayload);
};

const onGameStart = (socketId: string, room: string, io: any): Player[] => {
  const state: GameState = getGame(room);
  const players: Player[] = service.startGame(socketId, state, io);
  return players;
};

const onNewGame = (socketId: string, room: string): GameState => {
  const state: GameState = getGame(room);
  const newGame = service.newGame(socketId, state);
  rooms.set(room, newGame); // Save rooms game state
  return newGame;
};

const onTimerSet = (
  socketId: string,
  room: string,
  timeSpan: number,
  io: any,
): number => {
  const state: GameState = getGame(room);
  return service.setTime(socketId, state, timeSpan, io);
};

const onBankBust = (socketId: string, room: string): BankBustPayload => {
  const state: GameState = getGame(room);
  return service.bankBust(socketId, state);
};

const onRoll = (socketId: string, room: string): RollPayload => {
  const state: GameState = getGame(room);
  return service.roll(socketId, state);
};

const onSelect = (
  socketId: string,
  room: string,
  dieIndex: DieIndex,
): SelectPayload => {
  const state: GameState = getGame(room);
  return service.select(socketId, state, dieIndex);
};

const onConfirm = (socketId: string, room: string): ConfirmPayload => {
  const state: GameState = getGame(room);
  return service.confirm(socketId, state);
};

const onDisconnectGame = (
  socketId: string,
  room: string,
): PlayerAction | null => {
  try {
    const state: GameState = getGame(room);
    const playerAction: PlayerAction | null = service.disconnect(
      socketId,
      state,
    );
    if (!playerAction) {
      // Game is empty - perform deletion
      rooms.delete(room);
      log.info(REQUESTOR, `Room ${room} removed`);
      return null;
    }
    return playerAction; // Left player info
  } catch {
    return null; // Game does not exist
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
