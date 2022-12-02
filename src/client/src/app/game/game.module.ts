import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TimerComponent } from './timer/timer.component';
import { TimerPipe } from './pipe/timer.pipe';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { ScorePotentialComponent } from './score-potential/score-potential.component';
import { DieComponent } from './die/die.component';
import { DieFacePipe } from './pipe/die-face.pipe';
import { DiceBoardComponent } from './dice-board/dice-board.component';
import { ActionBoardComponent } from './action-board/action-board.component';
import { PlaysComponent } from './plays/plays.component';
import { ChatComponent } from './chat/chat.component';
import { ConfettiComponent } from './confetti/confetti.component';

@NgModule({
  declarations: [
    GameComponent,
    TimerComponent,
    TimerPipe,
    ScoreBoardComponent,
    ScorePotentialComponent,
    DieComponent,
    DieFacePipe,
    DiceBoardComponent,
    ActionBoardComponent,
    PlaysComponent,
    ChatComponent,
    ConfettiComponent,
  ],
  imports: [CommonModule, GameRoutingModule, SharedModule, FormsModule],
})
export class GameModule {}
