import { Component, OnInit } from '@angular/core';
import {
  flipInXOnEnterAnimation,
  flipOutXOnLeaveAnimation,
} from 'angular-animations';
import { Observable } from 'rxjs';
import { DieIndex } from '../model/die-index.type';
import { Player } from '../model/player.model';
import { GameFacade } from './state/game.facade';
import { GameState } from './state/game.state';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [flipInXOnEnterAnimation(), flipOutXOnLeaveAnimation()],
})
export class GameComponent implements OnInit {
  gameState!: Observable<GameState>;
  player!: Player;

  constructor(private gameFacade: GameFacade) {}

  ngOnInit(): void {
    this.gameState = this.gameFacade.getGameState();
  }

  onTimeSet(timeSpan: number): void {
    this.gameFacade.setTime(timeSpan);
  }

  onDieClicked($dieIndex: DieIndex): void {}
}
