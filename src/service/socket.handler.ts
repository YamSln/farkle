import { Server, Socket } from "socket.io";
import { JoinType } from "../auth/join.type";
import {
  FORBIDDEN,
  NOT_FOUND,
  GAME_STARTED,
  UNAUTHORIZED,
} from "../error/error.util";
import { GameEvent } from "../event/game.event";
import { JoinEvent } from "../event/join.event";
import { CreateGamePayload } from "../model/create-game.payload";
import { JoinPayload } from "../model/join.payload";
import handler from "./game.handler";
import log from "../config/log";
import { DieIndex } from "../model/die-index.type";
import { RollPayload } from "../payload/roll.payload";
import { SelectPayload } from "../payload/select.payload";

const REQUESTOR = "SOCKET_HANDLER";

const onConnection = (socket: Socket, io: Server) => {
  log.debug(REQUESTOR, `${socket.id} connected!`);
  // On socket connection
  const auth: CreateGamePayload = socket.handshake.auth as CreateGamePayload;
  const joinType = socket.handshake.query.join;
  if (!auth) {
    disconnect(socket, UNAUTHORIZED);
  } // Check join type
  if (!joinType) {
    disconnect(socket, FORBIDDEN);
  } // Create / Join
  switch (joinType) {
    case JoinType.CREATE:
      createGame(socket, auth);
      break;
    case JoinType.JOIN:
      joinGame(socket, auth);
      break;
    default:
      disconnect(socket, NOT_FOUND);
  }

  const room = getSocketRoom(socket);

  socket.on(GameEvent.NEW_GAME, () => {
    const newGame = handler.onNewGame(room);
    io.to(room).emit(GameEvent.NEW_GAME, newGame);
  });
  /*
  socket.on(GameEvent.START_GAME, () => {
    const start = handler.onGameStart(room); // TODO : Implement
    io.to(room).emit(GameEvent.START_GAME, start);
  });
*/
  socket.on(GameEvent.ROLL, () => {
    const rollPayload: RollPayload = handler.onRoll(socket.id, room); // TODO : Implement
    io.to(room).emit(
      rollPayload.bust ? GameEvent.BUST : GameEvent.ROLL,
      rollPayload.dice
    );
  });

  socket.on(GameEvent.SELECT, (dieIndex: DieIndex) => {
    const selected: SelectPayload = handler.onSelect(socket.id, room, dieIndex); // TODO : Implement
    io.to(room).emit(GameEvent.SELECT, selected);
  });
  /*
  socket.on(GameEvent.CONFIRM, () => {
    const result = handler.onConfirm(room);
    io.to(room).emit(GameEvent.CONFIRM, result);
  });
*/
  socket.on(GameEvent.BANK, () => {
    const score = handler.onBank(socket.id, room); // TODO : Implement
    io.to(room).emit(GameEvent.BANK, score);
  });
  /*
  socket.on(GameEvent.TIME_SET, (timeSpan: number) => {
    const time = handler.onTimerSet(room, timeSpan, io); // TODO : Implement
    io.to(room).emit(GameEvent.TIME_SET, time);
  });
*/
  socket.on(GameEvent.DISCONNECT_SELF, () => {
    disconnect(socket);
  });

  socket.on(GameEvent.DISCONNECTING, () => {
    const room = getSocketRoom(socket);
    // Disconnect player from its room
    const playerAction = handler.onDisconnectGame(socket.id, room);
    // Emit player disconnected event
    if (playerAction) {
      socket.broadcast
        .to(room)
        .emit(GameEvent.PLAYER_DISCONNECTED, playerAction);
    }
  });
};

const joinGame = (socket: Socket, joinPayload: JoinPayload) => {
  try {
    const event: JoinEvent = handler.onJoinGame(socket.id, joinPayload);
    socket.join(joinPayload.room);
    socket.emit(
      GameEvent.JOIN_GAME,
      { ...event.state, turnInterval: "" },
      joinPayload.room,
      event.joined
    );
    socket.broadcast.to(joinPayload.room).emit(GameEvent.PLAYER_JOINED, {
      nick: event.joined.nick,
      updatedPlayers: event.state.players,
    });
  } catch (err: any) {
    handler.onDisconnectGame(socket.id, joinPayload.room);
    disconnect(socket, err.message);
  }
};

const createGame = (socket: Socket, payload: CreateGamePayload) => {
  try {
    const game = handler.onCreateGame(socket.id, payload);
    socket.emit(GameEvent.CREATE_GAME, game, payload.room, game.players[0]);
    socket.join(payload.room);
  } catch (err: any) {
    handler.onDisconnectGame(socket.id, payload.room);
    disconnect(socket, err.message);
  }
};

const disconnect = (socket: Socket, message?: string) => {
  if (message) {
    sendError(socket, message);
    log.error(
      REQUESTOR,
      `Client id: ${socket.id} - ${socket.handshake.address} disconnected due to and error - ${message}`
    );
  }
  socket.disconnect(true);
};

const sendError = (socket: Socket, message: string) => {
  socket.emit("error", message);
};

const getSocketRoom = (socket: Socket): string => {
  let rooms = Array.from(socket.rooms);
  return rooms.filter((room) => room != socket.id)[0];
};

export default { onConnection };
