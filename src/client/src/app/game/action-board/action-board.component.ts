import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { GamePhase } from 'src/app/model/game.phase.model';

@Component({
  selector: 'app-action-board',
  templateUrl: './action-board.component.html',
  styleUrls: ['./action-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionBoardComponent implements OnInit {
  @Input() bust!: boolean;
  @Input() gamePhase!: GamePhase;
  @Input() firstRoll!: boolean;

  @Output() confirmClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() bankBustClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() rollClick: EventEmitter<any> = new EventEmitter<any>();

  _gamePhaseConstant = GamePhase;

  constructor() {}

  ngOnInit(): void {}

  onConfirmClick(): void {
    if (this.gamePhase == GamePhase.PICK) {
      this.confirmClick.emit();
    }
  }

  onBankBustClick(): void {
    if (
      (this.gamePhase == GamePhase.ROLL || this.gamePhase == GamePhase.PICK) &&
      !this.firstRoll
    ) {
      this.bankBustClick.emit();
    }
  }

  onRollClick(): void {
    if (this.gamePhase == GamePhase.ROLL) {
      this.rollClick.emit();
    }
  }
}
