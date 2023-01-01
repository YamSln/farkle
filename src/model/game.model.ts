import { Die, getRandomDice, getRandomDie } from "./die.model";
import { DICE_COUNT, MIN_PLAYERS, MIN_POINTS } from "../util/game.constants";
import { GamePhase } from "./game.phase.model";
import { Player } from "./player.model";
import { DieIndex } from "./die-index.type";
import util from "../util/game.util";
import { alg } from "../service/game.alg";
import { RollPayload } from "../payload/roll.payload";
import { SelectPayload } from "../payload/select.payload";

export interface GameState {
  // Room properties
  password: string;
  maxPlayers: number;
  maxPoints: number;
  // Game fields
  players: Player[];
  dice: Die[];
  currentThrowPicks: Die[][]; // Plays confirmed by current player
  currentTurnScores: number[];
  potentialScore: number;
  currentPlayer: number;
  gamePhase: GamePhase;
  bust: boolean;
  gameWon: boolean;
  allDiceConfirmed: boolean;
  // Timing
  turnTime: number;
  currentTime: number;
  turnInterval?: NodeJS.Timeout;

  start(): Player[] | null;
  newGame(): Game | null;
  /**
   * Performs roll action on the game state:
   * rolls all unconfirmed/unselected dice and moves to pick phase.
   * Returns null if roll is not allowed i.e. game is not in ROLL phase
   */
  roll(): RollPayload | null;
  select(dieIndex: DieIndex): SelectPayload;
  confirm(): number | null;
  bank(): number | null;
  pause(): boolean | null;
  resume(): boolean | null;
  timeSet(time: number): number | null;
  isPlaying(playerId: string): boolean;
  isHost(playerId: string): boolean;
}

export class Game implements GameState {
  password: string = "";
  maxPlayers: number = MIN_PLAYERS;
  maxPoints: number = MIN_POINTS;
  players: Player[] = [];
  dice: Die[] = [];
  currentThrowPicks: Die[][] = [];
  currentTurnScores: number[] = [];
  potentialScore: number = 0;
  currentPlayer: number = 0;
  gamePhase: GamePhase = GamePhase.WAIT;
  bust: boolean = false;
  gameWon: boolean = false;
  allDiceConfirmed = false;
  turnTime: number = 0;
  currentTime: number = 0;
  turnInterval?: NodeJS.Timeout;

  private prevPhase: GamePhase = GamePhase.WAIT;

  constructor(
    password: string,
    players: Player[],
    maxPoints: number,
    maxPlayers: number
  ) {
    this.password = password;
    this.players = players;
    this.maxPoints = maxPoints;
    this.maxPlayers = maxPlayers;
    this.dice = getRandomDice(DICE_COUNT);
  }

  start(): Player[] | null {
    const phaseChanged: boolean = this.changeGamePhase(GamePhase.ROLL);
    if (!phaseChanged) {
      return null;
    }
    this.shufflePlayers();
    return this.players;
  }

  newGame(): Game | null {
    const game: Game = new Game(
      this.password,
      this.players,
      this.maxPoints,
      this.maxPlayers
    );
    game.shufflePlayers();
    game.start();
    return game;
  }

  select(dieIndex: DieIndex): SelectPayload {
    this.dice[dieIndex].selected = !this.dice[dieIndex].selected;
    return alg.getPoints(this.dice);
  }

  confirm(): number | null {
    // Get potential score
    // Add to current scores
    // Proceed to ROLL / BANK
    throw new Error("Method not implemented.");
  }

  bank(): number | null {
    // Increase player score
    this.players[this.currentPlayer].points += util.sumArray(
      this.currentTurnScores
    );
    this.currentTurnScores = []; // Reset turn scores
    // Check if player won game
    if (this.players[this.currentPlayer].points >= this.maxPoints) {
      this.winGame();
      return null;
    } // Otherwise next turn
    this.nextTurn();
    return this.players[this.currentPlayer].points;
  }

  timeSet(time: number): number | null {
    this.turnTime = time;
    return time;
  }

  roll(): RollPayload | null {
    const roll: boolean = this.changeGamePhase(GamePhase.PICK);
    if (roll) {
      this.reRollDice();
      const bust = alg.checkBust(this.dice);
      return { dice: [...this.dice], bust };
    }
    return null; // Illegal action
  }

  pause(): boolean | null {
    this.prevPhase = this.gamePhase;
    return this.changeGamePhase(GamePhase.PAUSE);
  }

  resume(): boolean | null {
    return this.prevPhase ? this.changeGamePhase(this.prevPhase) : null;
  }

  isPlaying(playerId: string): boolean {
    return this.players[this.currentPlayer].id === playerId;
  }

  isHost(playerId: string): boolean {
    const player = this.players.findIndex((player) => player.id === playerId);
    return this.players[player].host;
  }

  private shufflePlayers(): void {
    this.players = util.shuffleArray(this.players);
  }

  private winGame(): number {
    this.gameWon = true;
    return this.currentPlayer;
  }

  private nextTurn(): number {
    this.gamePhase = GamePhase.ROLL;
    this.currentPlayer++;
    return this.currentPlayer;
  }

  private reRollDice(): void {
    for (let i = 0; i < this.dice.length; i++) {
      // Roll each dice that is not selected or confirmed
      if (!this.dice[i].confirmed || this.allDiceConfirmed) {
        this.dice[i] = getRandomDie(this.dice[i].joker);
      }
    }
    if (this.allDiceConfirmed) {
      this.resetAllConfirmed();
    }
  }

  private resetAllConfirmed(): void {
    this.allDiceConfirmed = false;
  }

  private changeGamePhase(newPhase: GamePhase): boolean {
    if (this.gamePhase === GamePhase.PAUSE || newPhase === GamePhase.PAUSE) {
      // Change to PAUSE or from PAUSE is always allowed
      if (this.gamePhase !== GamePhase.WAIT) {
        // Except from WAIT
        this.gamePhase = newPhase;
        return true;
      }
    }
    switch (newPhase) {
      case GamePhase.ROLL: // Change to ROLL is allowed from PICK and WAIT
        if (
          this.gamePhase === GamePhase.PICK ||
          this.gamePhase === GamePhase.WAIT
        ) {
          this.gamePhase = newPhase;
          return true;
        }
      case GamePhase.PICK: // Change to PICK is allowed from ROLL
        if (this.gamePhase === GamePhase.ROLL) {
          this.gamePhase = newPhase;
        }
        return true;
    }
    return false;
  }
}
