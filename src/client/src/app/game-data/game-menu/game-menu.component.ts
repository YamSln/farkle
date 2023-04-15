import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { GameFacade } from 'src/app/game/state/game.facade';
import { GameState } from 'src/app/game/state/game.state';
import { GamePhase } from '../../../../../model/game.phase.model';
import { Player } from '../../../../../model/player.model';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameMenuComponent implements OnInit {
  gameState!: Observable<GameState>;
  player!: Player;

  @Output() newGameClick = new EventEmitter<boolean>();

  _gamePhaseConstant = GamePhase;

  constructor(private gameFacade: GameFacade) {}

  ngOnInit(): void {
    this.gameState = this.gameFacade.getGameState();
  }

  onNewGameClick($event: boolean): void {
    this.newGameClick.emit($event);
  }
}
