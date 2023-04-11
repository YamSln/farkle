import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSelectorComponent } from './time-selector/time-selector.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { PlaysComponent } from './plays/plays.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { DieFacePipe } from './pipe/die-face.pipe';
import { TimerPipe } from './pipe/timer.pipe';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import { CoreModule } from '../core/core.module';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { FormsModule } from '@angular/forms';
import { DecorationsToggleComponent } from './decorations-toggle/decorations-toggle.component';
import { PopupsToggleComponent } from './popups-toggle/popups-toggle.component';
import { SumPipe } from './pipe/sum.pipe';
import { DieSortPipe } from './pipe/die-sort.pipe';

@NgModule({
  declarations: [
    TimeSelectorComponent,
    ScoreBoardComponent,
    PlaysComponent,
    GameMenuComponent,
    DieFacePipe,
    DieSortPipe,
    TimerPipe,
    SettingsMenuComponent,
    ThemeToggleComponent,
    DecorationsToggleComponent,
    PopupsToggleComponent,
    SumPipe,
  ],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [
    TimeSelectorComponent,
    ScoreBoardComponent,
    PlaysComponent,
    GameMenuComponent,
    TimerPipe,
    DieFacePipe,
    SettingsMenuComponent,
    ThemeToggleComponent,
    SumPipe,
  ],
})
export class GameDataModule {}
