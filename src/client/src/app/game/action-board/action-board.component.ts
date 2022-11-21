import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GamePhase } from 'src/app/model/game.phase.model';

@Component({
  selector: 'app-action-board',
  templateUrl: './action-board.component.html',
  styleUrls: ['./action-board.component.scss'],
})
export class ActionBoardComponent implements OnInit {
  @Input() bust: boolean = false;
  @Input() gamePhase: GamePhase = GamePhase.WAIT;

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
    if (this.gamePhase == GamePhase.BANK) {
      this.bankBustClick.emit();
    }
  }

  onRollClick(): void {
    if (this.gamePhase == GamePhase.ROLL) {
      this.rollClick.emit();
    }
  }
}
