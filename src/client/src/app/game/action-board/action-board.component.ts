import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { GamePhase } from '../../../../../model/game.phase.model';

@Component({
  selector: 'app-action-board',
  templateUrl: './action-board.component.html',
  styleUrls: ['./action-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionBoardComponent implements OnInit, OnChanges {
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

  response: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.responseReceived();
  }

  onConfirmClick(): void {
    if (this.gamePhase == GamePhase.PICK && this.playing) {
      this.confirmClick.emit();
      this.responseSent();
    }
  }

  onBankBustClick(): void {
    if (
      (this.gamePhase == GamePhase.ROLL || this.gamePhase == GamePhase.PICK) &&
      this.playing
    ) {
      this.bankBustClick.emit();
      this.responseSent();
    }
  }

  onRollClick(): void {
    if (this.gamePhase == GamePhase.ROLL && this.playing) {
      this.rollClick.emit();
      this.responseSent();
    }
  }

  onStartGameClick(): void {
    if (this.gamePhase == GamePhase.WAIT && this.host) {
      this.startGameClick.emit();
      this.responseSent();
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

  private responseSent(): void {
    this.response = false;
  }

  private responseReceived(): void {
    this.response = true;
  }
}
