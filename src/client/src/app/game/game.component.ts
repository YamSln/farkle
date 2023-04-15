import { Component, OnInit } from '@angular/core';
import {
  flipInXOnEnterAnimation,
  flipOutXOnLeaveAnimation,
} from 'angular-animations';
import { Observable } from 'rxjs';
import { DieIndex } from '../../../../model/die-index.type';
import { Player } from '../../../../model/player.model';
import { GameFacade } from './state/game.facade';
import { GameState } from './state/game.state';
import { GamePhase } from '../../../../model/game.phase.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [flipInXOnEnterAnimation(), flipOutXOnLeaveAnimation()],
})
export class GameComponent implements OnInit {
  gameState!: Observable<GameState>;
  player!: Player;
  _gamePhaseConstant = GamePhase;

  constructor(private gameFacade: GameFacade) {}

  ngOnInit(): void {
    this.gameState = this.gameFacade.getGameState();
  }

  onTimeSet(timeSpan: number): void {
    this.gameFacade.setTime(timeSpan);
  }

  onDieSelected($dieIndex: any): void {
    this.gameFacade.selectDie($dieIndex as DieIndex);
  }

  onConfirmation(): void {
    this.gameFacade.confirm();
  }

  onBankBust(): void {
    this.gameFacade.bankBust();
  }

  onGameStart(): void {
    this.gameFacade.startGame();
  }

  onRoll(): void {
    this.gameFacade.roll();
  }

  onNewGame($event: boolean): void {
    this.gameFacade.newGame($event);
  }
}
