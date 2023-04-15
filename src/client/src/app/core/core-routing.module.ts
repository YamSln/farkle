import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameFormComponent } from './game-form/game-form.component';
import { LayoutComponent } from './layout/layout.component';
import { GameGuard } from '../game/guard/game.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: GameFormComponent },
      { path: 'join/:roomId', component: GameFormComponent },
      {
        path: 'game',
        loadChildren: () =>
          // Transfer to game module on route change
          import('../game/game.module').then((m) => m.GameModule),
      },
      { path: '**', pathMatch: 'full', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
