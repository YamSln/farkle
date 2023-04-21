import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DICE_SCORES } from '../../../../../../util/game.constants';

@Component({
  selector: 'app-rules-dialog',
  templateUrl: './rules-dialog.component.html',
  styleUrls: ['./rules-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RulesDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<RulesDialogComponent>) {}
  dataSource = DICE_SCORES;
  ngOnInit(): void {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
