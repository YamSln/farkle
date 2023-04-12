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
  @Input() playing!: boolean;
  @Input() bust!: boolean;
  @Input() gamePhase!: GamePhase;
  @Input() firstRoll!: boolean;
  @Input() host!: boolean;
  @Input() startAllowed!: boolean;
  @Input() confirmable!: boolean;
  @Input() gameWon!: boolean;

  @Output() confirmClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() bankBustClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() rollClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() startGameClick: EventEmitter<any> = new EventEmitter<any>();

  _gamePhaseConstant = GamePhase;

  constructor() {}

  ngOnInit(): void {}

  onConfirmClick(): void {
    if (this.gamePhase == GamePhase.PICK && this.playing) {
      this.confirmClick.emit();
    }
  }

  onBankBustClick(): void {
    if (
      (this.gamePhase == GamePhase.ROLL || this.gamePhase == GamePhase.PICK) &&
      this.playing
    ) {
      this.bankBustClick.emit();
    }
  }

  onRollClick(): void {
    if (this.gamePhase == GamePhase.ROLL && this.playing) {
      this.rollClick.emit();
    }
  }

  onStartGameClick(): void {
    if (this.gamePhase == GamePhase.WAIT && this.host) {
      this.startGameClick.emit();
    }
  }

  onRollConfirmClick(): void {
    if (this.gamePhase === GamePhase.ROLL) {
      this.onRollClick();
    }
    if (this.gamePhase === GamePhase.PICK) {
      this.onConfirmClick();
    }
  }
}
