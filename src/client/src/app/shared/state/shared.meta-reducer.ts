import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { LocalStorageService } from '../service/localstorage.service';
import { IS_LIGHT_THEME, MUTED } from './shared.state';
import { SHARED_STATE_NAME } from './shared.selector';
import { SoundService } from '../service/sound.service';

export function getMetaReducers(
  localStorageService: LocalStorageService,
  soundService: SoundService
): MetaReducer<any>[] {
  return [sharedMetaReducer(localStorageService, soundService)];
}

export function sharedMetaReducer<S, A extends Action = Action>(
  localStorageService: LocalStorageService,
  soundService: SoundService
) {
  let onInit = true;
  return function (reducer: ActionReducer<S, A>) {
    return function (state: S, action: A): S {
      const nextState: S = reducer(state, action);
      if (onInit) {
        // First time after load / refresh
        onInit = false;
        const isLightTheme = localStorageService.isLightTheme();
        const muted = localStorageService.isMuted();
        soundService.setMuted(muted);
        return mergeStorableSharedState(nextState, isLightTheme, muted);
      } // Extract storable properties from state and save them
      const isLightTheme: any = extractStorableSharedState(
        nextState,
        IS_LIGHT_THEME
      );
      const muted: any = extractStorableSharedState(nextState, MUTED);
      localStorageService.setLightTheme(isLightTheme);
      localStorageService.setMuted(muted);
      soundService.setMuted(muted);
      return nextState;
    };
  };
}

function mergeStorableSharedState(
  state: any,
  isLightTheme: boolean,
  muted: boolean
): any {
  return {
    ...state,
    shared: { ...state[SHARED_STATE_NAME], isLightTheme, muted },
  };
}

function extractStorableSharedState(state: any, param: any): string {
  return state[SHARED_STATE_NAME][param];
}
