import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GeneralDialogComponent } from '../general-dialog/general-dialog.component';
import { MatDialogData } from '../model/mat-dialog.data';
import { RulesDialogComponent } from '../rules-dialog/rules-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openGeneralDialog(dialogData: MatDialogData): Observable<any> {
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      data: dialogData.data,
      autoFocus: false,
    });
    return dialogRef.afterClosed();
  }

  openRulesDialog(): void {
    this.dialog.open(RulesDialogComponent, { maxWidth: 800 });
  }
}
