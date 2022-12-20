import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameFacade } from 'src/app/game/state/game.facade';
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
  isLightTheme!: Observable<boolean>;
  roomUrl!: Observable<string>;

  constructor(
    private gameFacade: GameFacade,
    private sharedFacade: SharedFacade
  ) {}

  ngOnInit(): void {
    this.isLightTheme = this.sharedFacade.getIsLightTheme();
    this.roomUrl = this.gameFacade.getRoomUrl();
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
}
