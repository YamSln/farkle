import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Player } from '../../../../../model/player.model';
import { DialogService } from 'src/app/shared/dialog/service/dialog.service';
import { GamePhase } from '../../../../../model/game.phase.model';

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
  @Input() gamePhase!: GamePhase;
  @Input() restartable!: boolean;

  @Output() newGameClick: EventEmitter<any> = new EventEmitter();

  _gamePhaseConstant = GamePhase;
  displayedColumns: string[] = ['name', 'score'];

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}

  onNewGameClick(): void {
    this.newGameClick.emit();
  }
}
