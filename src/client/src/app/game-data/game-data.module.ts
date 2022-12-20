import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSelectorComponent } from './time-selector/time-selector.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { PlaysComponent } from './plays/plays.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { DieFacePipe } from './pipe/die-face.pipe';
import { TimerPipe } from './pipe/timer.pipe';

@NgModule({
  declarations: [
    TimeSelectorComponent,
    ScoreBoardComponent,
    PlaysComponent,
    GameMenuComponent,
    DieFacePipe,
    TimerPipe,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    TimeSelectorComponent,
    ScoreBoardComponent,
    PlaysComponent,
    GameMenuComponent,
    TimerPipe,
    DieFacePipe,
  ],
})
export class GameDataModule {}
