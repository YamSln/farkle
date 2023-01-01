import { createAction, props } from '@ngrx/store';
import { Player } from 'src/app/model/player.model';
import { CreateGamePayload } from '../../model/create-game.payload';
import { CreateGameResponse } from '../../model/create-game.response';
import { JoinGamePayload } from '../../model/join-game.payload';
import { GameState } from './game.state';

const GAME_PAGE = '[game page]';

export const JOIN_GAME = `${GAME_PAGE} join game`;
export const PLAYER_JOINED = `${GAME_PAGE} player joined`;
export const JOIN_GAME_APPROVED = `${GAME_PAGE} player join approved`;
export const JOIN_GAME_SUCCESS = `${GAME_PAGE} join game success`;

export const CREATE_GAME = `${GAME_PAGE} create game`;
export const CREATE_GAME_APPROVED = `${GAME_PAGE} create game approved`;
export const CREATE_GAME_SUCCESS = `${GAME_PAGE} create game success`;

export const NEW_GAME = `${GAME_PAGE} new game`;
export const NEW_GAME_SUCCESS = `${GAME_PAGE} new game success`;

export const TIME_CHANGED = `${GAME_PAGE} time changed`;
export const TIME_CHANGED_SUCCESS = `${GAME_PAGE} time changed success`;
export const TIME_UPDATE = `${GAME_PAGE} time update`;

export const PLAYER_DISCONNECT = `${GAME_PAGE} player disconnect`;

export const QUIT_GAME = `${GAME_PAGE} quit game`;
export const CLEAR_STATE = `${GAME_PAGE} clear state`;

export const joinGame = createAction(JOIN_GAME, props<JoinGamePayload>());
export const joinGameApproved = createAction(
  JOIN_GAME_APPROVED,
  props<{ token: string }>()
);
export const joinGameSuccess = createAction(
  JOIN_GAME_SUCCESS,
  props<{ game: GameState; room: string; player: Player }>()
);
export const playerJoinedGame = createAction(
  PLAYER_JOINED,
  props<{ players: Player[] }>()
);

export const createGame = createAction(CREATE_GAME, props<CreateGamePayload>());
export const createGameApproved = createAction(
  CREATE_GAME_APPROVED,
  props<CreateGameResponse>()
);
export const createGameSuccess = createAction(
  CREATE_GAME_SUCCESS,
  props<{ game: GameState; room: string; player: Player }>()
);

export const timeChanged = createAction(
  TIME_CHANGED,
  props<{ timeSpan: number }>()
);
export const timeChangedSuccess = createAction(
  TIME_CHANGED_SUCCESS,
  props<{ timeSpan: number }>()
);
export const timeUpdate = createAction(
  TIME_UPDATE,
  props<{ currentTime: number }>()
);

export const newGame = createAction(NEW_GAME);
export const newGameSuccess = createAction(
  NEW_GAME_SUCCESS,
  props<{ game: GameState; selfIndex: number }>()
);

export const playerDisconnect = createAction(
  PLAYER_DISCONNECT,
  props<{ players: Player[] }>()
);

export const quitGame = createAction(QUIT_GAME);
export const clearState = createAction(CLEAR_STATE);
