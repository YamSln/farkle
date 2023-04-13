import { createReducer, on } from '@ngrx/store';
import {
  bankSuccess,
  bustSuccess,
  clearState,
  confirmSuccess,
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
  timeout,
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
      dice: initialDice,
    };
  }),
  on(joinGameSuccess, (state: GameState, action: any): GameState => {
    return {
      ...action.game,
      roomId: action.room,
      selfIndex: findSelf(action.game.players, action.player.id),
      dice: initialDice,
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
          return {
            ...die,
            selected: action.selectPayload.selected,
            number: die.joker ? action.selectPayload.jokerNumber : die.number,
          };
        }
        if (die.joker) {
          return { ...die, number: action.selectPayload.jokerNumber };
        }
        return die;
      }),
      potentialScore: action.selectPayload.potentialScore,
    };
  }),
  on(confirmSuccess, (state: GameState, action: any): GameState => {
    return {
      ...state,
      currentThrowPicks: [
        ...state.currentThrowPicks,
        action.confirmPayload.currentThrowPick,
      ],
      currentTurnScores: [
        ...state.currentTurnScores,
        action.confirmPayload.currentThrowScore,
      ],
      dice: state.dice.map((die, index) =>
        action.confirmPayload.diceIndices.includes(index)
          ? { ...die, selected: false, confirmed: true }
          : die
      ),
      potentialScore: 0,
      gamePhase: GamePhase.ROLL,
    };
  }),
  on(bankSuccess, (state: GameState, action: any): GameState => {
    return {
      ...state,
      players: state.players.map((player, index) => {
        if (index === state.currentPlayer) {
          return {
            ...player,
            points: player.points + action.bankBustPayload.pointsEarned,
          };
        }
        return player;
      }),
      gameWon: action.bankBustPayload.wonGame,
      currentPlayer: action.bankBustPayload.nextPlayerIndex,
      gamePhase: GamePhase.ROLL,
      currentThrowPicks: [],
      currentTurnScores: [],
    };
  }),
  on(bustSuccess, (state: GameState, action: any): GameState => {
    return {
      ...state,
      bust: false,
      currentPlayer: action.bankBustPayload.nextPlayerIndex,
      gamePhase: GamePhase.ROLL,
      currentThrowPicks: [],
      currentTurnScores: [],
    };
  }),
  on(timeChangedSuccess, (state: GameState, action: any): GameState => {
    return {
      ...state,
      turnTime: action.timeSpan,
      currentTime: action.timeSpan,
    };
  }),
  on(timeout, (state: GameState, action: any): GameState => {
    return {
      ...state,
      bust: false,
      currentPlayer: action.nextPlayerIndex,
      gamePhase: GamePhase.ROLL,
      currentThrowPicks: [],
      currentTurnScores: [],
    };
  }),
  on(timeUpdate, (state: GameState, action: any): GameState => {
    return {
      ...state,
      currentTime: action.currentTime,
    };
  }),
  on(newGameSuccess, (state: GameState, action: any): GameState => {
    return {
      ...action.game,
      roomId: state.roomId,
      playerId: state.playerId,
      selfIndex: findSelf(action.game.players, state.playerId),
      dice: initialDice,
    };
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

const initialDice = [
  { number: 1, confirmed: true, selected: false, joker: true },
  { number: 1, confirmed: true, selected: false, joker: true },
  { number: 1, confirmed: true, selected: false, joker: true },
  { number: 1, confirmed: true, selected: false, joker: true },
  { number: 1, confirmed: true, selected: false, joker: true },
  { number: 1, confirmed: true, selected: false, joker: true },
];

export function GameReducer(state: GameState, action: any): GameState {
  return _gameReducer(state, action);
}
