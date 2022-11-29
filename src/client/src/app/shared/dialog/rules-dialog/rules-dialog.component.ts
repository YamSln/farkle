import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rules-dialog',
  templateUrl: './rules-dialog.component.html',
  styleUrls: ['./rules-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RulesDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<RulesDialogComponent>) {}

  ngOnInit(): void {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
