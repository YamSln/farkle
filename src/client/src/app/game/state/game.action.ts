import { createAction, props } from '@ngrx/store';
import { Player } from 'src/app/model/player.model';
import { CreateGamePayload } from '../../model/create-game.payload';
import { CreateGameResponse } from '../../model/create-game.response';
import { JoinGamePayload } from '../../model/join-game.payload';
import { GameState } from './game.state';
import { Die } from 'src/app/model/die.model';
import { DieIndex } from 'src/app/model/die-index.type';
import { SelectPayload } from '../../../../../payload/select.payload';
import { ConfirmPayload } from '../../../../../payload/confirm.payload';
import { BankBustPayload } from '../../../../../payload/bankbust.payload';
import { PlayerAction } from 'src/app/model/player.action.payload';

const GAME_PAGE = '[game page]';

export const JOIN_GAME = `${GAME_PAGE} join game`;
export const PLAYER_JOINED = `${GAME_PAGE} player joined`;
export const JOIN_GAME_APPROVED = `${GAME_PAGE} player join approved`;
export const JOIN_GAME_SUCCESS = `${GAME_PAGE} join game success`;

export const CREATE_GAME = `${GAME_PAGE} create game`;
export const CREATE_GAME_APPROVED = `${GAME_PAGE} create game approved`;
export const CREATE_GAME_SUCCESS = `${GAME_PAGE} create game success`;

export const START_GAME = `${GAME_PAGE} start game`;
export const START_GAME_SUCCESS = `${GAME_PAGE} start game success`;

export const NEW_GAME = `${GAME_PAGE} new game`;
export const NEW_GAME_SUCCESS = `${GAME_PAGE} new game success`;

export const TIME_CHANGED = `${GAME_PAGE} time changed`;
export const TIME_CHANGED_SUCCESS = `${GAME_PAGE} time changed success`;
export const TIME_UPDATE = `${GAME_PAGE} time update`;
export const TIME_OUT = `${GAME_PAGE} timeout`;

export const PLAYER_DISCONNECT = `${GAME_PAGE} player disconnect`;

export const QUIT_GAME = `${GAME_PAGE} quit game`;
export const CLEAR_STATE = `${GAME_PAGE} clear state`;

export const ROLL = `${GAME_PAGE} roll`;
export const ROLL_SUCCESS = `${GAME_PAGE} roll success`;

export const SELECT_DIE = `${GAME_PAGE} select die`;
export const SELECT_DIE_SUCCESS = `${GAME_PAGE} select die success`;

export const CONFIRM = `${GAME_PAGE} confirm`;
export const CONFIRM_SUCCESS = `${GAME_PAGE} confirm success`;

export const BANK_BUST = `${GAME_PAGE} bank_bust`;
export const BANK_SUCCESS = `${GAME_PAGE} bank success`;
export const BUST_SUCCESS = `${GAME_PAGE} bust success`;

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

export const roll = createAction(ROLL);
export const rollSuccess = createAction(
  ROLL_SUCCESS,
  props<{ dice: Die[]; bust: boolean }>()
);

export const selectDie = createAction(SELECT_DIE, props<{ index: DieIndex }>());
export const selectDieSuccess = createAction(
  SELECT_DIE_SUCCESS,
  props<{
    selectPayload: SelectPayload;
  }>()
);

export const confirm = createAction(CONFIRM);
export const confirmSuccess = createAction(
  CONFIRM_SUCCESS,
  props<{ confirmPayload: ConfirmPayload }>()
);

export const bankBust = createAction(BANK_BUST);
export const bankSuccess = createAction(
  BANK_SUCCESS,
  props<{ bankBustPayload: BankBustPayload }>()
);
export const bustSuccess = createAction(
  BUST_SUCCESS,
  props<{ bankBustPayload: BankBustPayload }>()
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
export const timeout = createAction(
  TIME_OUT,
  props<{ nextPlayerIndex: number }>()
);

export const startGame = createAction(START_GAME);
export const startGameSuccess = createAction(
  START_GAME_SUCCESS,
  props<{ players: Player[] }>()
);

export const newGame = createAction(NEW_GAME);
export const newGameSuccess = createAction(
  NEW_GAME_SUCCESS,
  props<{ game: GameState; selfIndex: number }>()
);

export const playerDisconnect = createAction(
  PLAYER_DISCONNECT,
  props<{ playerAction: PlayerAction }>()
);

export const quitGame = createAction(QUIT_GAME);
export const clearState = createAction(CLEAR_STATE);
