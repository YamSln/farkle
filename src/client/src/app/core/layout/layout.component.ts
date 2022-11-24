import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameFacade } from 'src/app/game/state/game.facade';
import { environment } from 'src/environments/environment';

const PREF_THEME = 'preferred_theme';
const LIGHT = 'light';
const DARK = 'dark';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  version: string = environment.version;
  isLightTheme!: boolean;
  roomUrl!: Observable<string>;

  constructor(private gameFacade: GameFacade) {}

  ngOnInit(): void {
    this.roomUrl = this.gameFacade.getRoomUrl();
    this.isLightTheme = localStorage.getItem(PREF_THEME) === LIGHT;
  }

  themeToggleChanged(): void {
    this.isLightTheme = !this.isLightTheme;
    localStorage.setItem(PREF_THEME, this.isLightTheme ? LIGHT : DARK);
  }
}
