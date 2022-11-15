import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TimerComponent } from './timer/timer.component';
import { TimerPipe } from './pipe/timer.pipe';

@NgModule({
  declarations: [GameComponent, TimerComponent, TimerPipe],
  imports: [CommonModule, GameRoutingModule, SharedModule, FormsModule],
})
export class GameModule {}
