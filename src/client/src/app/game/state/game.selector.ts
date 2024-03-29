import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JOIN_URL } from 'src/app/service/game.service';
import { GameState } from './game.state';

export const GAME_STATE_NAME = 'game';

export const getGameState = createFeatureSelector<GameState>(GAME_STATE_NAME);

export const getRoomUrl = createSelector(getGameState, (state) =>
  state.roomId ? `${JOIN_URL}/${state.roomId}` : state.roomId
);

export const getTurnTime = createSelector(
  getGameState,
  (state) => state.turnTime
);

export const getGamePhase = createSelector(
  getGameState,
  (state) => state.gamePhase
);

export const getHostState = createSelector(getGameState, (state) => {
  if (state.players) {
    return state.players[state.selfIndex].host;
  }
  return false;
});
