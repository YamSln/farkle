import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { GeneralDialogComponent } from './dialog/general-dialog/general-dialog.component';
import { LoadingComponent } from './loading/loading.component';
import { PlayerActionComponent } from './player-action/player-action.component';
import { TruncatedTooltipDirective } from './tooltip/truncated-tooltip.directive';
import { InputTrimDirective } from './input-trim/input-trim.directive';
import { RulesDialogComponent } from './dialog/rules-dialog/rules-dialog.component';
import { DieScoreComponent } from './dialog/die-score/die-score.component';

@NgModule({
  declarations: [
    PasswordFieldComponent,
    ErrorComponent,
    GeneralDialogComponent,
    LoadingComponent,
    PlayerActionComponent,
    TruncatedTooltipDirective,
    InputTrimDirective,
    RulesDialogComponent,
    DieScoreComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    MaterialModule,
    PasswordFieldComponent,
    LoadingComponent,
    ErrorComponent,
    PlayerActionComponent,
    TruncatedTooltipDirective,
    InputTrimDirective,
  ],
})
export class SharedModule {}
