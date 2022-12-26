import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { GameFormComponent } from './game-form/game-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { GameEffect } from '../game/state/game.effect';
import { StoreModule } from '@ngrx/store';
import { GAME_STATE_NAME } from '../game/state/game.selector';
import { GameReducer } from '../game/state/game.reducer';
import { ClipboardModule } from 'ngx-clipboard';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { OptionMenuComponent } from './option-menu/option-menu.component';
import { RulesComponent } from './rules/rules.component';
import { GithubComponent } from './github/github.component';
import { GameDataModule } from '../game-data/game-data.module';

@NgModule({
  declarations: [
    LayoutComponent,
    GameFormComponent,
    FooterComponent,
    HeaderComponent,
    OptionMenuComponent,
    RulesComponent,
    GithubComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    GameDataModule,
    EffectsModule.forFeature([GameEffect]),
    StoreModule.forFeature(GAME_STATE_NAME, GameReducer),
  ],
})
export class CoreModule {}
