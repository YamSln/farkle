export interface SharedState {
  loading: boolean;
  errorMessage: string;
  playerAction: string;
  isLightTheme: boolean;
}

export const sharedInitialState: SharedState = {
  loading: false,
  errorMessage: '',
  playerAction: '',
  isLightTheme: false,
};
