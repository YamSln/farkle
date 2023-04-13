import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameFacade } from 'src/app/game/state/game.facade';
import { GameState } from 'src/app/game/state/game.state';
import { GamePhase } from 'src/app/model/game.phase.model';
import { SharedFacade } from 'src/app/shared/state/shared.facade';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  version: string = environment.version;
  isMenuOpen: boolean = false;
  gameState!: Observable<GameState>;
  isLightTheme!: Observable<boolean>;
  roomUrl!: Observable<string>;

  _gamePhaseConstant = GamePhase;

  constructor(
    private gameFacade: GameFacade,
    private sharedFacade: SharedFacade
  ) {}

  ngOnInit(): void {
    this.roomUrl = this.gameFacade.getRoomUrl();
    this.isLightTheme = this.sharedFacade.getIsLightTheme();
    this.gameState = this.gameFacade.getGameState();
  }

  themeToggleChanged(): void {
    this.sharedFacade.toggleTheme();
  }

  menuToggleChanged(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  menuClosed(): void {
    this.isMenuOpen = false;
  }

  timeChanged($event: any): void {
    this.gameFacade.setTime($event);
  }

  onNewGame($event: boolean): void {
    this.gameFacade.newGame($event);
  }
}
