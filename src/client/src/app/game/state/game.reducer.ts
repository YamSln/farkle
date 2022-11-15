import { createReducer, on } from '@ngrx/store';
import { Participant } from '../../model/participant.model';
import { Role } from '../../model/role.model';
import { Team } from '../../model/team.model';
import {
  clearState,
  createGameSuccess,
  joinGameSuccess,
  newGameSuccess,
  playerDisconnect,
  playerJoinedGame,
  timeChangedSuccess,
  timeUpdate,
} from './game.action';
import { GameState, initialState } from './game.state';

const _gameReducer = createReducer(
  initialState,
  on(createGameSuccess, (state: GameState, action: any): GameState => {
    return {
      ...action.game,
      roomId: action.room,
      playerId: action.player.id,
      playerRole: action.player.role,
      playerTeam: action.player.team,
    };
  }),
  on(joinGameSuccess, (state: GameState, action: any): GameState => {
    return {
      ...action.game,
      roomId: action.room,
      playerId: action.player.id,
      playerRole: action.player.role,
      playerTeam: action.player.team,
    };
  }),
  on(playerJoinedGame, (state: GameState, action: any): GameState => {
    return { ...state, participants: action.players };
  }),
  on(timeChangedSuccess, (state: GameState, action: any): GameState => {
    return {
      ...state,
      turnTime: action.timeSpan,
      currentTime: action.timeSpan,
    };
  }),
  on(timeUpdate, (state: GameState, action: any): GameState => {
    return { ...state, currentTime: action.currentTime };
  }),
  on(newGameSuccess, (state: GameState, action: any): GameState => {
    const game: GameState = action.game;
    const player = game.participants.find(
      (player: Participant) => player.id == state.playerId
    );
    return {
      ...game,
      playerId: player ? player.id : '',
      playerRole: player ? player.role : Role.OPERATIVE,
      playerTeam: player ? player.team : Team.SAPPHIRE,
    };
  }),
  on(playerDisconnect, (state: GameState, action: any): GameState => {
    return { ...state, participants: action.players };
  }),
  on(clearState, (state: GameState, action: any): GameState => {
    return { ...initialState };
  })
);

const changeTurn = (state: GameState): GameState => {
  // change current turn
  return {
    ...state,
    currentTeam:
      state.currentTeam === Team.SAPPHIRE ? Team.RUBY : Team.SAPPHIRE,
    currentTime: state.turnTime ? state.turnTime : 0,
  };
};

export function GameReducer(state: GameState, action: any): GameState {
  return _gameReducer(state, action);
}
