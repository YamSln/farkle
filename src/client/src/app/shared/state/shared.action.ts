import { createAction, props } from '@ngrx/store';

export const DISPLAY_LOADING = '[shared state] display loading';
export const DISPLAY_ERROR_MESSAGE = '[shared state] display error message';
export const DISPLAY_PLAYER_ACTION = '[shared state] display player action';
export const TOGGLE_THEME = '[shared state] toggle theme';
export const TOGGLE_MUTE = '[shared state] toggle mute';

export const displayLoading = createAction(
  DISPLAY_LOADING,
  props<{ status: boolean }>()
);

export const displayErrorMessage = createAction(
  DISPLAY_ERROR_MESSAGE,
  props<{ message: string }>()
);

export const displayPlayerAction = createAction(
  DISPLAY_PLAYER_ACTION,
  props<{ message: string }>()
);

export const toggleTheme = createAction(TOGGLE_THEME);

export const toggleMute = createAction(TOGGLE_MUTE);
