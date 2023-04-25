import { createReducer, on } from '@ngrx/store';
import {
  displayErrorMessage,
  displayLoading,
  displayPlayerAction,
  toggleMute,
  toggleTheme,
} from './shared.action';
import { sharedInitialState, SharedState } from './shared.state';

const _sharedReducer = createReducer(
  sharedInitialState,
  on(displayLoading, (state: SharedState, action: any): SharedState => {
    return { ...state, loading: action.status };
  }),
  on(displayErrorMessage, (state: SharedState, action: any): SharedState => {
    return { ...state, errorMessage: action.message };
  }),
  on(displayPlayerAction, (state: SharedState, action: any): SharedState => {
    return { ...state, playerAction: action.message };
  }),
  on(toggleTheme, (state: SharedState, action: any): SharedState => {
    return { ...state, isLightTheme: !state.isLightTheme };
  }),
  on(toggleMute, (state: SharedState, action: any): SharedState => {
    return { ...state, muted: !state.muted };
  })
);

export function SharedReducer(state: any, action: any): any {
  return _sharedReducer(state, action);
}
