import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Player } from 'src/app/model/player.model';
import { GeneralDialogDefinition } from 'src/app/shared/dialog/model/general-dialog.definition';
import { GeneralDialogType } from 'src/app/shared/dialog/model/general-dialog.type';
import { MatDialogData } from 'src/app/shared/dialog/model/mat-dialog.data';
import { DialogService } from 'src/app/shared/dialog/service/dialog.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreBoardComponent implements OnInit {
  @Input() players!: Player[];
  @Input() playing!: string;
  @Input() selfIndex!: number;
  @Input() host!: boolean;
  @Input() gameWon!: boolean;

  @Output() newGameClick: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['name', 'score'];

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}

  onNewGameClick(): void {
    this.newGameClick.emit();
  }
}
