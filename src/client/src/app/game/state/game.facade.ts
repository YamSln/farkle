import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CreateGamePayload } from '../../../../../model/create-game.payload';
import { JoinPayload } from '../../../../../model/join.payload';
import { PlayerAction } from '../../../../../model/player.action.payload';
import { Player } from '../../../../../model/player.model';
import { displayPlayerAction } from 'src/app/shared/state/shared.action';
import {
  bankBust,
  bankSuccess,
  bustSuccess,
  clearState,
  confirm,
  confirmSuccess,
  createGame,
  createGameSuccess,
  joinGame,
  joinGameSuccess,
  newGame,
  newGameSuccess,
  playerDisconnect,
  playerJoinedGame,
  quitGame,
  roll,
  rollSuccess,
  selectDie,
  selectDieSuccess,
  startGame,
  startGameSuccess,
  timeChanged,
  timeChangedSuccess,
  timeUpdate,
  timeout,
} from './game.action';
import {
  getGamePhase,
  getGameState,
  getHostState,
  getRoomUrl,
  getTurnTime,
} from './game.selector';
import { GameState } from './game.state';
import { Die } from 'src/app/model/die.model';
import { DieIndex } from '../../../../../model/die-index.type';
import { SelectPayload } from '../../../../../payload/select.payload';
import { ConfirmPayload } from '../../../../../payload/confirm.payload';
import { BankBustPayload } from '../../../../../payload/bankbust.payload';
import { DialogService } from 'src/app/shared/dialog/service/dialog.service';
import { MatDialogData } from 'src/app/shared/dialog/model/mat-dialog.data';
import { GeneralDialogType } from 'src/app/shared/dialog/model/general-dialog.type';
import { GeneralDialogDefinition } from 'src/app/shared/dialog/model/general-dialog.definition';
import { GamePhase } from '../../../../../model/game.phase.model';
import { SoundService } from 'src/app/shared/service/sound.service';

@Injectable({ providedIn: 'root' })
export class GameFacade implements OnDestroy {
  dialogSubscription!: Subscription;
  constructor(
    private store: Store<GameState>,
    private router: Router,
    private dialogService: DialogService,
    private soundService: SoundService
  ) {}

  createGame(game: CreateGamePayload): void {
    this.store.dispatch(createGame(game));
  }

  joinGame(joinPayload: JoinPayload): void {
    this.store.dispatch(joinGame(joinPayload));
  }

  startGame(): void {
    this.store.dispatch(startGame());
  }

  newGame(gameWon: boolean): void {
    if (!gameWon) {
      const dialogData: MatDialogData = {
        data: {
          dialogType: GeneralDialogType.WARNING,
          dialogDefinition: GeneralDialogDefinition.CONFIRMATION,
          dialogMessage: 'Start a new game?',
        },
        panelClass: 'dialog',
      };
      this.dialogSubscription = this.dialogService
        .openGeneralDialog(dialogData)
        .subscribe((value) => {
          if (value) {
            this.dispatchNewGame();
          }
        });
    } else {
      this.dispatchNewGame();
    }
  }

  private dispatchNewGame(): void {
    this.store.dispatch(newGame());
  }

  quitGame(): void {
    this.clearGame();
    this.store.dispatch(quitGame());
  }

  roll(): void {
    this.store.dispatch(roll());
  }

  rolled(dice: Die[], bust: boolean): void {
    this.store.dispatch(rollSuccess({ dice, bust }));
    if (bust) {
      this.soundService.playBustSoundEffect();
    }
  }

  selectDie(index: DieIndex): void {
    this.store.dispatch(selectDie({ index }));
  }

  dieSelected(selectPayload: SelectPayload): void {
    this.store.dispatch(selectDieSuccess({ selectPayload }));
  }

  confirm(): void {
    this.store.dispatch(confirm());
  }

  confimed(confirmPayload: ConfirmPayload): void {
    this.store.dispatch(confirmSuccess({ confirmPayload }));
  }

  bankBust(allDiceConfirmed: boolean): void {
    if (allDiceConfirmed) {
      const dialogData: MatDialogData = {
        data: {
          dialogType: GeneralDialogType.INFO,
          dialogDefinition: GeneralDialogDefinition.CONFIRMATION,
          dialogMessage: 'You sure you want to bank?',
        },
        panelClass: 'dialog',
      };
      this.dialogSubscription = this.dialogService
        .openGeneralDialog(dialogData)
        .subscribe((value) => {
          if (value) {
            this.store.dispatch(bankBust());
          }
        });
    } else {
      this.store.dispatch(bankBust());
    }
  }

  banked(bankBustPayload: BankBustPayload): void {
    this.store.dispatch(bankSuccess({ bankBustPayload }));
    if (bankBustPayload.wonGame) {
      this.soundService.playWinSoundEffect();
    }
  }

  busted(bankBustPayload: BankBustPayload): void {
    this.store.dispatch(bustSuccess({ bankBustPayload }));
  }

  playerJoined(playerAction: PlayerAction): void {
    this.store.dispatch(
      playerJoinedGame({ players: playerAction.updatedPlayers })
    );
    this.displayPlayerAction(playerAction, ' Joined!');
  }

  playerDisconnected(playerAction: PlayerAction): void {
    this.store.dispatch(playerDisconnect({ playerAction }));
    this.displayPlayerAction(playerAction, ' Left');
  }

  displayPlayerAction(playerAction: PlayerAction, message: string): void {
    this.displayInGameMessage('none', playerAction.nick + message);
  }

  displayInGameMessage(action: 'forbidden' | 'none', message: string): void {
    switch (action) {
      case 'forbidden':
      // Implement
    }
    this.store.dispatch(displayPlayerAction({ message: message }));
    this.clearPlayerAction();
  }

  clearPlayerAction(): void {
    this.store.dispatch(displayPlayerAction({ message: '' }));
  }

  setTime(timeSpan: number): void {
    this.store.dispatch(timeChanged({ timeSpan }));
  }

  timeSet(timeSpan: number): void {
    this.store.dispatch(timeChangedSuccess({ timeSpan }));
  }

  timeUpdate(currentTime: number): void {
    this.store.dispatch(timeUpdate({ currentTime }));
  }

  timeout(nextPlayerIndex: number): void {
    this.store.dispatch(timeout({ nextPlayerIndex }));
  }

  gameLoaded(game: GameState, room: string, player: Player): void {
    this.navigateToGame();
    this.store.dispatch(createGameSuccess({ game, room, player }));
  }

  gameReceived(game: GameState, room: string, player: Player): void {
    this.navigateToGame();
    this.store.dispatch(joinGameSuccess({ game, room, player }));
  }

  gameStarted(players: Player[]): void {
    this.store.dispatch(startGameSuccess({ players }));
  }

  newGameReceived(game: GameState, selfIndex: number): void {
    this.store.dispatch(newGameSuccess({ game, selfIndex }));
  }

  getGameState(): Observable<GameState> {
    return this.store.select(getGameState);
  }

  getHostState(): Observable<boolean> {
    return this.store.select(getHostState);
  }

  getRoomUrl(): Observable<string> {
    return this.store.select(getRoomUrl);
  }

  getTime(): Observable<number> {
    return this.store.select(getTurnTime);
  }

  getGamePhase(): Observable<GamePhase> {
    return this.store.select(getGamePhase);
  }

  navigateToGame(): void {
    this.router.navigate(['/game']);
  }

  navigateToMain(): void {
    this.router.navigate(['/']);
  }

  clearGame(): void {
    this.store.dispatch(clearState());
  }

  ngOnDestroy(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }
}
