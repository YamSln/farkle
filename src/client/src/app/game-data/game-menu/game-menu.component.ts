import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameFacade } from 'src/app/game/state/game.facade';
import { GameState } from 'src/app/game/state/game.state';
import { Player } from 'src/app/model/player.model';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameMenuComponent implements OnInit {
  gameState!: Observable<GameState>;
  player!: Player;

  constructor(private gameFacade: GameFacade) {}

  ngOnInit(): void {
    this.gameState = this.gameFacade.getGameState();
  }
}
