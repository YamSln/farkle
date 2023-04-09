import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateGamePayload } from 'src/app/model/create-game.payload';
import { JoinGamePayload } from 'src/app/model/join-game.payload';
import { PlayerAction } from 'src/app/model/player.action.payload';
import { Player } from 'src/app/model/player.model';
import { displayPlayerAction } from 'src/app/shared/state/shared.action';
import {
  clearState,
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
  startGame,
  startGameSuccess,
  timeChanged,
  timeChangedSuccess,
  timeUpdate,
} from './game.action';
import { getGameState, getHostState, getRoomUrl } from './game.selector';
import { GameState } from './game.state';
import { Die } from 'src/app/model/die.model';

@Injectable({ providedIn: 'root' })
export class GameFacade {
  constructor(
    private store: Store<GameState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  createGame(game: CreateGamePayload): void {
    this.store.dispatch(createGame(game));
  }

  joinGame(joinPayload: JoinGamePayload): void {
    this.store.dispatch(joinGame(joinPayload));
  }

  startGame(): void {
    this.store.dispatch(startGame());
  }

  newGame(): void {
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
  }

  playerJoined(playerAction: PlayerAction): void {
    this.store.dispatch(
      playerJoinedGame({ players: playerAction.updatedPlayers })
    );
    this.displayPlayerAction(playerAction, ' Joined!');
  }

  playerDisconnected(playerAction: PlayerAction): void {
    this.store.dispatch(
      playerDisconnect({ players: playerAction.updatedPlayers })
    );
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

  navigateToGame(): void {
    this.router.navigate(['/game']);
  }

  navigateToMain(): void {
    this.router.navigate(['/']);
  }

  clearGame(): void {
    this.store.dispatch(clearState());
  }
}
