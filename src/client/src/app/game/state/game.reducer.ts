import { createReducer, on } from '@ngrx/store';
import {
  clearState,
  createGameSuccess,
  joinGameSuccess,
  newGameSuccess,
  playerDisconnect,
  playerJoinedGame,
  rollSuccess,
  selectDieSuccess,
  startGameSuccess,
  timeChangedSuccess,
  timeUpdate,
} from './game.action';
import { GameState, initialState } from './game.state';
import { GamePhase } from '../../../../../model/game.phase.model';
import { JOKER_INDEX } from '../../../../../util/game.constants';
import { findSelf } from './game.state.util';
import { Die } from 'src/app/model/die.model';

const _gameReducer = createReducer(
  initialState,
  on(createGameSuccess, (state: GameState, action: any): GameState => {
    return {
      ...action.game,
      roomId: action.room,
      selfIndex: 0,
      currentPlayer: 0,
    };
  }),
  on(joinGameSuccess, (state: GameState, action: any): GameState => {
    return {
      ...action.game,
      roomId: action.room,
      selfIndex: findSelf(action.game.players, action.player.id),
    };
  }),
  on(playerJoinedGame, (state: GameState, action: any): GameState => {
    return { ...state, players: action.players };
  }),
  on(rollSuccess, (state: GameState, action: any): GameState => {
    return {
      ...state,
      dice: action.dice,
      bust: action.bust,
      gamePhase: GamePhase.PICK,
    };
  }),
  on(selectDieSuccess, (state: GameState, action: any): GameState => {
    return {
      ...state,
      dice: state.dice.map((die, index) => {
        if (index == action.selectPayload.dieIndex) {
          return { ...die, selected: action.selectPayload.selected };
        }
        if (die.joker) {
          return { ...die, number: action.selectPayload.jokerNumber };
        }
        return die;
      }),
      potentialScore: action.selectPayload.potentialScore,
    };
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
    return game;
  }),
  on(startGameSuccess, (state: GameState, action: any): GameState => {
    return {
      ...state,
      players: action.players,
      gamePhase: GamePhase.ROLL,
      selfIndex: findSelf(action.players, state.playerId),
    };
  }),
  on(playerDisconnect, (state: GameState, action: any): GameState => {
    return {
      ...state,
      players: action.players,
      selfIndex: findSelf(action.game.players, state.playerId),
    };
  }),
  on(clearState, (state: GameState, action: any): GameState => {
    return { ...initialState };
  })
);

const changeTurn = (state: GameState): GameState => {
  // change current turn
  return {
    ...state,
    currentTime: state.turnTime ? state.turnTime : 0,
  };
};

export function GameReducer(state: GameState, action: any): GameState {
  return _gameReducer(state, action);
}
