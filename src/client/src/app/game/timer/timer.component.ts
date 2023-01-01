import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { headShakeAnimation } from 'angular-animations';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [headShakeAnimation()],
})
export class TimerComponent implements OnInit, OnChanges {
  @Input() time!: number;
  @Input() display!: boolean;

  constructor() {}

  warningState = false;

  ngOnInit(): void {
    this.time = 0;
    this.display = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.time <= 10) {
      this.warningState = !this.warningState;
    }
  }
}
