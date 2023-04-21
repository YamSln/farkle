import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';
import { GamePhase } from '../../../../../model/game.phase.model';
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
  collapseOnLeaveAnimation,
  jelloAnimation,
} from 'angular-animations';

@Component({
  selector: 'app-play-banner',
  templateUrl: './play-banner.component.html',
  styleUrls: ['./play-banner.component.scss'],
  animations: [
    jelloAnimation(),
    bounceInOnEnterAnimation(),
    bounceOutOnLeaveAnimation({ duration: 500 }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayBannerComponent implements OnInit, OnChanges {
  @Input() playing!: boolean;
  @Input() nick!: string;
  @Input() gamePhase!: GamePhase;

  bounceIn: boolean = true;

  _gamePhaseConstant = GamePhase;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.gamePhase) {
      if (changes.gamePhase.currentValue === GamePhase.PICK) {
        this.bounceIn = false;
      } else if (changes.gamePhase.currentValue === GamePhase.WAIT) {
        this.bounceIn = true;
      }
    }
  }

  ngOnInit(): void {}
}
