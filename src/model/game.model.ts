import { Die, getRandomDice, getRandomDie } from "./die.model";
import { DICE_COUNT, MIN_PLAYERS, MIN_POINTS } from "../util/game.constants";
import { GamePhase } from "./game.phase.model";
import { Player } from "./player.model";
import { DieIndex } from "./die-index.type";

export interface GameState {
  // Room properties
  roomId?: string;
  password: string;
  maxPlayers: number;
  maxPoints: number;
  // Game fields
  players: Player[];
  dice: Die[];
  currentThrowPicks: Die[][]; // Plays confirmed by current player
  currentTurnScores: number[];
  currentPlayer: number;
  gamePhase: GamePhase;
  bust: boolean;
  gameWon: boolean;
  // Timing
  turnTime: number;
  currentTime: number;
  turnInterval?: NodeJS.Timeout;

  /**
   * Performs roll action on the game state:
   * rolls all unconfirmed/unselected dice and moves to pick phase.
   * Returns null if roll is not allowed i.e. game is not in ROLL phase
   */
  roll(): Die[] | null;
  pick(dieIndices: DieIndex[]): Die[] | null;
  pause(): boolean | null;
  resume(): boolean | null;
}

export class Game implements GameState {
  roomId?: string;
  password: string = "";
  maxPlayers: number = MIN_PLAYERS;
  maxPoints: number = MIN_POINTS;
  players: Player[] = [];
  dice: Die[] = [];
  currentThrowPicks: Die[][] = [];
  currentTurnScores: number[] = [];
  currentPlayer: number = 0;
  gamePhase: GamePhase = GamePhase.WAIT;
  bust: boolean = false;
  gameWon: boolean = false;
  turnTime: number = 0;
  currentTime: number = 0;
  turnInterval?: NodeJS.Timeout;

  private prevPhase: GamePhase = GamePhase.WAIT;

  /**
   * Returns and initial game state with given room properties
   * @param roomId id of the game room
   * @param password password of the game room
   * @param host host player, also first player in the game room
   */
  constructor(roomId: string, password: string, host: Player) {
    this.roomId = roomId;
    this.password = password;
    this.players = [host];
    this.dice = getRandomDice(DICE_COUNT);
  }

  public roll(): Die[] | null {
    if (this.gamePhase !== GamePhase.ROLL) {
      return null; // Illegal action
    }
    this.reRollDice();
    this.changeGamePhase(GamePhase.PICK);
    return [...this.dice];
  }

  private reRollDice(): void {
    for (let i = 0; i < this.dice.length; i++) {
      // Roll each dice that is not selected or confirmed
      if (!this.dice[i].confirmed && !this.dice[i].selected) {
        this.dice[i] = getRandomDie(this.dice[i].joker);
      }
    }
  }

  private changeGamePhase(newPhase: GamePhase): void {
    if (this.gamePhase === GamePhase.PAUSE || newPhase === GamePhase.PAUSE) {
      // Change to PAUSE or from PAUSE is always allowed
      if (this.gamePhase !== GamePhase.WAIT) {
        // Except from WAIT
        this.gamePhase = newPhase;
      }
    }
    switch (newPhase) {
      case GamePhase.ROLL: // Change to ROLL is allowed from PICK and WAIT
        if (
          this.gamePhase === GamePhase.PICK ||
          this.gamePhase === GamePhase.WAIT
        ) {
          this.gamePhase = newPhase;
        }
        break;
      case GamePhase.PICK: // Change to PICK is allowed from ROLL
        if (this.gamePhase === GamePhase.ROLL) {
          this.gamePhase = newPhase;
        }
        break;
    }
  }
}
