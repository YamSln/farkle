export enum GameEvent {
  CONNECT = 'connect',
  JOIN_GAME = 'joinGame',
  PLAYER_JOINED = 'playerJoined',
  CREATE_GAME = 'createGame',
  DISCONNECT = 'disconnect',
  DISCONNECT_SELF = 'disconnect_self',
  NEW_GAME = 'newGame',
  TIME_SET = 'timeSet',
  TIME_TICK = 'timeTick',
  CHANGE_TURN = 'changeTurn',
  PLAYER_DISCONNECTED = 'playerDisconnected',
  ERROR = 'error',
}
