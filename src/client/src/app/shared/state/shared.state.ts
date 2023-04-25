export const IS_LIGHT_THEME = 'isLightTheme';
export const MUTED = 'muted';

export interface SharedState {
  loading: boolean;
  errorMessage: string;
  playerAction: string;
  [IS_LIGHT_THEME]: boolean;
  [MUTED]: boolean;
}

export const sharedInitialState: SharedState = {
  loading: false,
  errorMessage: '',
  playerAction: '',
  isLightTheme: false,
  muted: false,
};
