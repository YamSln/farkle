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
import { GameDTO } from "./game.dto";

export interface GameState extends GameDTO {
  // Room properties
  password: string;
  maxPlayers: number;
  maxPoints: number;
  // Game fields
  turnInterval?: NodeJS.Timeout;

  start(): Player[] | null;
  newGame(): Game | null;
  roll(): RollPayload | null;
  select(dieIndex: DieIndex): SelectPayload | null;
  confirm(): ConfirmPayload | null;
  bankBust(): BankBustPayload | null;
  timeSet(time: number): number | null;
  timeout(): number;
  resetCurrentTimer(): void;
  clearTimer(erase: boolean): void;
  isPlaying(playerId: string): boolean;
  isHost(playerId: string): boolean;
  playerIndex(playerId: string): number;
  resetTurn(): number;
}

export const transferable = (state: GameState): GameDTO => {
  const { turnInterval, password, maxPlayers, maxPoints, ...transferable } =
    state;
  return transferable;
};

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
          wasConfirmed: false,
          wasSelected: false,
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
    this.resetCurrentTimer();
    return {
      currentThrowScore: throwScore,
      currentThrowPick: confirmedDice,
      diceIndices,
      allDiceConfirmed: this.allDiceConfirmed,
    };
  }

  bankBust(): BankBustPayload | null {
    if (!this.bust) {
      // Increase player score
      const total: number = (this.players[this.currentPlayer].points +=
        this.currentTurnScore);
      // Check if player won game
      if (total >= this.maxPoints) {
        this.gameWon = true;
        this.clearTimer(false);
      }
    }
    // Next turn
    const bust: boolean = this.bust;
    const pointsEarned: number = this.currentTurnScore;
    this.nextTurn();
    return {
      bust,
      nextPlayerIndex: this.currentPlayer,
      wonGame: this.gameWon,
      pointsEarned,
    };
  }

  timeSet(time: number): number | null {
    this.turnTime = time;
    return time;
  }

  roll(): RollPayload | null {
    const roll: boolean = this.changeGamePhase(GamePhase.PICK);
    if (roll) {
      this.reRollDice();
      const bust: boolean = alg.checkBust(this.dice);
      this.bust = bust;
      return { dice: [...this.dice], bust };
    }
    return null; // Illegal action
  }

  timeout(): number {
    this.nextTurn();
    return this.currentPlayer;
  }

  clearTimer = (erase: boolean = false): void => {
    if (this.turnInterval) {
      clearInterval(this.turnInterval);
    }
    if (erase) {
      this.turnTime = 0;
      this.currentTime = 0;
    }
  };

  resetCurrentTimer(): void {
    this.currentTime = this.turnTime + 1;
  }

  isPlaying(playerId: string): boolean {
    return this.players[this.currentPlayer].id === playerId;
  }

  isHost(playerId: string): boolean {
    const player = this.playerIndex(playerId);
    return this.players[player].host;
  }

  playerIndex(playerId: string) {
    return this.players.findIndex((player) => player.id === playerId);
  }

  resetTurn(): number {
    if (this.currentPlayer >= this.players.length) {
      this.currentPlayer = 0;
    }
    this.resetTurnData();
    return this.currentPlayer;
  }

  private shufflePlayers(): void {
    this.players = util.shuffleArray(this.players);
  }

  private nextTurn(): void {
    if (!this.gameWon) {
      this.currentPlayer++;
      this.resetTurn();
    }
  }

  private resetTurnData(): boolean {
    this.changeGamePhase(GamePhase.ROLL);
    this.resetTurnScore();
    this.currentThrowPicks = [];
    this.bust = false;
    this.resetDiceConfirmation();
    this.resetCurrentTimer();
    return true;
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

  private resetDiceConfirmation(): void {
    this.dice.forEach((die) => (die.confirmed = false));
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
