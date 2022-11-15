export enum GameEvent {
  CONNECT = "connect",
  JOIN_GAME = "joinGame",
  PLAYER_JOINED = "playerJoined",
  CREATE_GAME = "createGame",
  DISCONNECT = "disconnect",
  DISCONNECTING = "disconnecting",
  DISCONNECT_SELF = "disconnect_self",

  // TODO : NEW EVENTS

  BANK = "bank",
  ROLL = "roll",
  BUST = "bust",
  PICK = "pick",

  NEW_GAME = "newGame",
  TIME_SET = "timeSet",
  TIME_TICK = "timeTick",
  PLAYER_DISCONNECTED = "playerDisconnected",
}
