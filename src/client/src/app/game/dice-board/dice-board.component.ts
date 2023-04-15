import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  zoomInOnEnterAnimation,
  zoomOutOnLeaveAnimation,
} from 'angular-animations';
import { DieIndex } from '../../../../../model/die-index.type';
import { Die } from 'src/app/model/die.model';
import { Player } from '../../../../../model/player.model';

@Component({
  selector: 'app-dice-board',
  templateUrl: './dice-board.component.html',
  styleUrls: ['./dice-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    zoomOutOnLeaveAnimation({ duration: 500 }),
    zoomInOnEnterAnimation({ duration: 500 }),
  ],
})
export class DiceBoardComponent implements OnInit {
  @Input() dice!: Die[];
  @Input() selectable!: boolean;
  @Input() winningPlayer!: Player | null;

  @Output() dieSelected: EventEmitter<DieIndex> = new EventEmitter<DieIndex>();

  constructor() {}

  ngOnInit(): void {}

  onDieSelected($event: number): void {
    if (this.selectable) {
      this.dieSelected.emit($event as DieIndex);
    }
  }
}
