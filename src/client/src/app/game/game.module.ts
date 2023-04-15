import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TimerComponent } from './timer/timer.component';
import { ScorePotentialComponent } from './score-potential/score-potential.component';
import { DieComponent } from './die/die.component';
import { DiceBoardComponent } from './dice-board/dice-board.component';
import { ActionBoardComponent } from './action-board/action-board.component';
import { ConfettiComponent } from './confetti/confetti.component';
import { GameDataModule } from '../game-data/game-data.module';

@NgModule({
  declarations: [
    GameComponent,
    TimerComponent,
    ScorePotentialComponent,
    DieComponent,
    DiceBoardComponent,
    ActionBoardComponent,
    ConfettiComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
    FormsModule,
    GameDataModule,
    GameDataModule,
  ],
})
export class GameModule {}
