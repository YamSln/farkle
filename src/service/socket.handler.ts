import { Server, Socket } from "socket.io";
import { JoinType } from "../auth/join.type";
import log from "../config/log";
import {
  FORBIDDEN,
  ILLEGAL,
  NOT_FOUND,
  UNAUTHORIZED,
} from "../error/error.util";
import { GameEvent } from "../event/game.event";
import { JoinEvent } from "../event/join.event";
import { CreateGamePayload } from "../payload/create-game.payload";
import { DieIndex } from "../model/die-index.type";
import { GameState } from "../model/game.model";
import { JoinPayload } from "../payload/join.payload";
import { PlayerAction } from "../model/player.action.payload";
import { BankBustPayload } from "../payload/bankbust.payload";
import { ConfirmPayload } from "../payload/confirm.payload";
import { RollPayload } from "../payload/roll.payload";
import { SelectPayload } from "../payload/select.payload";
import handler from "./game.handler";

const REQUESTOR = "SOCKET_HANDLER";

// Initialize socket actions
const onConnection = (socket: Socket, io: Server) => {
  log.debug(REQUESTOR, `${socket.id} connected!`);
  // On socket connection
  const auth: CreateGamePayload = socket.handshake.auth as CreateGamePayload;
  // Perform join actin according to its type
  const joinType = socket.handshake.query.join;
  if (!auth) {
    disconnect(socket, UNAUTHORIZED);
  }
  if (!joinType) {
    disconnect(socket, FORBIDDEN);
  }
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

  // Socket events handling

  socket.on(GameEvent.NEW_GAME, onNewGame);

  function onNewGame(): void {
    catchErrors(socket, () => {
      const newGame: GameState = handler.onNewGame(socket.id, room);
      io.to(room).emit(GameEvent.NEW_GAME, newGame);
    });
  }

  socket.on(GameEvent.START_GAME, onStartGame);

  function onStartGame(): void {
    catchErrors(socket, () => {
      const start = handler.onGameStart(socket.id, room, io);
      io.to(room).emit(GameEvent.START_GAME, start);
    });
  }

  socket.on(GameEvent.ROLL, onRoll);

  function onRoll(): void {
    catchErrors(socket, () => {
      const rollPayload: RollPayload = handler.onRoll(socket.id, room);
      io.to(room).emit(GameEvent.ROLL, rollPayload.dice, rollPayload.bust);
    });
  }

  socket.on(GameEvent.SELECT, onSelect);

  function onSelect(dieIndex: DieIndex): void {
    catchErrors(socket, () => {
      const selectPayload: SelectPayload = handler.onSelect(
        socket.id,
        room,
        dieIndex,
      );
      io.to(room).emit(GameEvent.SELECT, selectPayload);
    });
  }

  socket.on(GameEvent.CONFIRM, onConfirm);

  function onConfirm(): void {
    catchErrors(socket, () => {
      const confirmPayload: ConfirmPayload = handler.onConfirm(socket.id, room);
      io.to(room).emit(GameEvent.CONFIRM, confirmPayload);
    });
  }

  socket.on(GameEvent.BANK_BUST, onBankBust);

  function onBankBust(): void {
    catchErrors(socket, () => {
      const bankBustPayload: BankBustPayload = handler.onBankBust(
        socket.id,
        room,
      );
      io.to(room).emit(
        bankBustPayload.bust ? GameEvent.BUST : GameEvent.BANK,
        bankBustPayload,
      );
    });
  }

  socket.on(GameEvent.TIME_SET, onTimeSet);

  function onTimeSet(timeSpan: number): void {
    catchErrors(socket, () => {
      const time = handler.onTimerSet(socket.id, room, timeSpan, io);
      io.to(room).emit(GameEvent.TIME_SET, time);
    });
  }

  socket.on(GameEvent.DISCONNECT_SELF, () => {
    disconnect(socket);
  });

  socket.on(GameEvent.DISCONNECTING, onDisconnecting);

  function onDisconnecting(): void {
    catchErrors(socket, () => {
      const room = getSocketRoom(socket);
      let playerAction: PlayerAction | null = handler.onDisconnectGame(
        socket.id,
        room,
      );
      if (playerAction) {
        socket.broadcast
          .to(room)
          .emit(GameEvent.PLAYER_DISCONNECTED, playerAction);
      }
    });
  }
};

const joinGame = (socket: Socket, joinPayload: JoinPayload) => {
  handleConnectinError(socket, joinPayload.roomId, () => {
    const event: JoinEvent = handler.onJoinGame(socket.id, joinPayload);
    socket.join(joinPayload.roomId);
    socket.emit(GameEvent.JOIN_GAME, event.state, event.player);
    // Broadcast joined event to other players
    socket.broadcast.to(joinPayload.roomId).emit(GameEvent.PLAYER_JOINED, {
      nick: event.player.nick,
      updatedPlayers: event.state.players,
    });
  });
};

const createGame = (socket: Socket, createPayload: CreateGamePayload) => {
  handleConnectinError(socket, createPayload.roomId, () => {
    const game = handler.onCreateGame(socket.id, createPayload);
    socket.emit(GameEvent.CREATE_GAME, game);
    socket.join(createPayload.roomId);
  });
};

const disconnect = (socket: Socket, message?: string) => {
  if (message) {
    sendError(socket, message);
    log.error(
      REQUESTOR,
      `Client id: ${socket.id} - ${socket.handshake.address} disconnected due to and error - ${message}`,
    );
  }
  socket.disconnect(true);
};

const catchErrors = (socket: Socket, consumer: () => void): void => {
  try {
    consumer();
  } catch {
    sendIllegal(socket);
  }
};

const handleConnectinError = (
  socket: Socket,
  roomId: string,
  consumer: () => void,
): void => {
  try {
    consumer();
  } catch (err: any) {
    handler.onDisconnectGame(socket.id, roomId);
    disconnect(socket, err.message);
  }
};

const sendError = (socket: Socket, message: string) => {
  socket.emit("error", message);
};

const sendIllegal = (socket: Socket) => {
  socket.emit("illegal", ILLEGAL);
};

const getSocketRoom = (socket: Socket): string => {
  let rooms = Array.from(socket.rooms);
  return rooms.filter((room) => room != socket.id)[0];
};

export default { onConnection };
