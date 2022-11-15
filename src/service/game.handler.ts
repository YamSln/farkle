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
} from "../error/error.util";
import { CreateGamePayload } from "../model/create-game.payload";
import { PlayerAction } from "../model/player.action.payload";
import { GameEvent } from "../event/game.event";
import log from "../config/log";
import { MAXIMUM_MAX_PLAYERS } from "../validation/game.validation";
import { GamePhase } from "../model/game.phase.model";
const REQUESTOR = "GAME_HANDLER";

const rooms: Map<string, GameState> = new Map<string, GameState>();

const createGame = (
  nick: string,
  password: string,
  maxPlayers: number,
  maxPoints: number
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
  createGamePayload: CreateGamePayload
): GameState => {
  const state = service.createGame(
    createGamePayload.password,
    createGamePayload.maxPlayers,
    createGamePayload.maxPoints
  );
  const host: Player = {
    id: socketId,
    nick: createGamePayload.nick,
    points: 0,
    host: true,
  };
  state.players.push(host);
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

const onNewGame = (room: string): GameState => {
  const state = getGame(room);
  clearTimer(state);
  const newGame = service.newGame({
    ...state,
    roomId: room,
  });
  rooms.set(room, newGame);
  return newGame;
};

const winGame = (state: GameState, player: string): void => {
  state.winningPlayer = player;
  clearTimer(state, true);
};

const onTimerSet = (room: string, timeSpan: number, io: any): number => {
  const state = getGame(room);
  state.turnTime = timeSpan;
  state.currentTime = state.turnTime;
  // Clear timer interval
  clearTimer(state);
  if (timeSpan > 0) {
    state.turnInterval = setInterval(() => {
      state.currentTime--;
      if (state.currentTime >= 0) {
        // Timer ticking
        io.to(room).emit(GameEvent.TIME_TICK, state.currentTime);
      } else {
        // TimeOut - reset timer and change turn
        // TODO : Implement TimeOut
      }
    }, 1000);
  }
  return timeSpan;
};

const onBank = (socketId: string, room: string): number | null => {
  const state = getGame(room);
  const playerIndex = getPlayerIndex(socketId, state);
  if (
    state.gamePhase !== GamePhase.PICK ||
    playerIndex !== state.currentPlayer
  ) {
    return null;
  }

  // TODO : Implement banking process

  return nextTurn(state);
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
  room: string
): PlayerAction | null => {
  const game = rooms.get(room);
  if (game) {
    const index = game.players.findIndex((player) => player.id === socketId); // Find and remove participant, decrease players count
    if (index !== -1) {
      const player = game.players[index];
      game.players.splice(index, 1);
      if (game.players.length === 0) {
        // Remove game upon 0 participants
        clearTimer(game, true);
        rooms.delete(room);
        log.info(REQUESTOR, `Room ${room} removed`);
        return null;
      }
      return {
        nick: player.nick,
        updatedPlayers: Array.from(game.players),
      };
    }
  }
  return null;
};

const nextTurn = (room: GameState): number => {
  // Reset timer if exists
  if (room.turnTime) {
    room.currentTime = room.turnTime;
  }
  const nextIndex = room.currentPlayer + 1;
  return nextIndex > room.players.length - 1 ? 0 : nextIndex;
};

const getGame = (room: string): GameState => {
  const state = rooms.get(room);
  if (!state) {
    throw new Error(NOT_FOUND);
  }
  return state;
};

const getPlayer = (playerId: string, game: GameState): Player => {
  const player = game.players.find((player) => player.id === playerId);
  if (!player) {
    throw new Error(NOT_FOUND);
  }
  return player;
};

const getPlayerIndex = (playerId: string, game: GameState): number => {
  const playerIndex = game.players.findIndex(
    (player) => player.id === playerId
  );
  if (playerIndex === -1) {
    throw new Error(NOT_FOUND);
  }
  return playerIndex;
};

export default {
  createGame,
  joinGame,
  onCreateGame,
  onJoinGame,
  onTimerSet,
  onNewGame,
  onDisconnectGame,
  onBank,
};

export const handlerTest = {
  getGame,
  rooms,
};
