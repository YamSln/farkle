import { Die, getRandomDice, getRandomDie } from "./die.model";
import { DICE_COUNT, MIN_PLAYERS, MIN_POINTS } from "../util/game.constants";
import { GamePhase } from "./game.phase.model";
import { Player } from "./player.model";
import { DieIndex } from "./die-index.type";
import util from "../util/game.util";
import { alg } from "../service/game.alg";
import { RollPayload } from "../payload/roll.payload";
import { SelectPayload } from "../payload/select.payload";
import { ConfirmPayload } from "../payload/confirm.payload";
import { DieFace } from "./die-face.type";
import { BankBustPayload } from "../payload/bankbust.payload";

export interface GameState {
  // Room properties
  roomId: string;
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
  select(dieIndex: DieIndex): SelectPayload | null;
  confirm(): ConfirmPayload | null;
  bankBust(): BankBustPayload | null;
  pause(): boolean | null;
  resume(): boolean | null;
  timeSet(time: number): number | null;
  isPlaying(playerId: string): boolean;
  isHost(playerId: string): boolean;
}

export class Game implements GameState {
  roomId = "";
  password: string = "";
  maxPlayers: number = MIN_PLAYERS;
  maxPoints: number = MIN_POINTS;
  players: Player[] = [];
  dice: Die[] = [];
  currentThrowPicks: Die[][] = [];
  currentTurnScores: number[] = [];
  currentTurnScore: number = 0;
  potentialScore: number = 0;
  currentPlayer: number = 0;
  jokerNumberBeforeConfirm: DieFace = 1;
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
    maxPlayers: number,
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
      this.maxPlayers,
    );
    game.shufflePlayers();
    game.start();
    return game;
  }

  select(dieIndex: DieIndex): SelectPayload | null {
    if (this.dice[dieIndex].confirmed) {
      return null;
    }
    const selected: boolean = (this.dice[dieIndex].selected =
      !this.dice[dieIndex].selected);
    const payLoad: SelectPayload = {
      ...alg.getPoints(this.dice),
      selected,
      dieIndex,
    };
    this.jokerNumberBeforeConfirm = payLoad.jokerNumber;
    this.updatePotentialScore(payLoad.potentialScore);
    return payLoad;
  }

  confirm(): ConfirmPayload | null {
    // Get potential score
    if (!this.potentialScore || !this.changeGamePhase(GamePhase.ROLL)) {
      return null;
    }
    // Add to current scores
    const throwScore = this.potentialScore;
    this.increaseTurnScore();
    const confirmedDice: Die[] = [];
    const diceIndices: DieIndex[] = [];
    let confimationCount: number = 0;
    this.dice.forEach((die, index) => {
      if (die.selected) {
        // confirm die
        die.selected = false;
        die.confirmed = true;
        // Create copy for picks array
        confirmedDice.push({
          // Joker changed face
          number:
            die.joker && die.number == 1
              ? this.jokerNumberBeforeConfirm
              : die.number,
          joker: die.joker,
          confirmed: false,
          selected: false,
        });
        diceIndices.push(index as DieIndex);
      }
      if (die.confirmed) {
        confimationCount++;
      }
    });
    if (confimationCount === this.dice.length) {
      this.allDiceConfirmed = true;
    }
    this.currentThrowPicks.push(confirmedDice);
    return {
      currentThrowScore: throwScore,
      currentThrowPick: confirmedDice,
      diceIndices,
    };
  }

  bankBust(): BankBustPayload | null {
    // Increase player score
    this.players[this.currentPlayer].points += util.sumArray(
      this.currentTurnScores,
    );
    this.currentTurnScores = []; // Reset turn scores
    // Check if player won game
    if (this.players[this.currentPlayer].points >= this.maxPoints) {
      this.winGame();
      return null;
    } // Otherwise next turn
    this.nextTurn();
    return null;
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
      console.log(bust);
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
      this.allDiceConfirmed = false;
    }
  }

  private resetTurnScore(): void {
    this.currentTurnScores = [];
    this.currentTurnScore = 0;
  }

  private increaseTurnScore(): void {
    this.currentTurnScores.push(this.potentialScore);
    this.currentTurnScore += this.potentialScore;
    this.potentialScore = 0;
  }

  private updatePotentialScore(potentialScore: number) {
    if (potentialScore) {
      this.potentialScore = potentialScore;
    } else {
      this.potentialScore = 0;
    }
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
