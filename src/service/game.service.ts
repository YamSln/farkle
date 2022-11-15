import { GameState } from "../model/game.model";
import { v4 as uuidv4 } from "uuid";
import { Player } from "../model/player.model";
import { GamePhase } from "../model/game.phase.model";

const newGame = (currentGame: GameState): GameState => {
  return createGame(
    currentGame.password,
    currentGame.maxPlayers,
    currentGame.maxPoints,
    currentGame
  );
};

const createGame = (
  password: string,
  maxPlayers: number,
  maxPoints: number,
  currentGame?: GameState
): GameState => {
  const game: GameState = {
    ...currentGame,
    players: currentGame ? currentGame.players : [],
    currentPlayer: currentGame ? getRandomPlayer(currentGame.players) : 0,
    currentThrowPicks: [],
    currentTurnScore: 0,
    dice: [],
    gamePhase: GamePhase.WAIT,
    maxPoints: currentGame ? currentGame.maxPoints : maxPoints,
    turnTime: 0,
    currentTime: 0,
    winningPlayer: undefined,
    turnInterval: undefined,
    maxPlayers,
    password,
  }; // Return new game
  return game;
};

const getRandomPlayer = (players: Player[]): number => {
  return getRandomNumber(0, players.length - 1);
};

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default {
  newGame,
  createGame,
  getRandomNumber,
};
