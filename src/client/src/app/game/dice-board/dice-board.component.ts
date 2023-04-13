import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DieIndex } from 'src/app/model/die-index.type';
import { Die } from 'src/app/model/die.model';

@Component({
  selector: 'app-dice-board',
  templateUrl: './dice-board.component.html',
  styleUrls: ['./dice-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiceBoardComponent implements OnInit {
  @Input() dice!: Die[];
  @Input() selectable!: boolean;

  @Output() dieSelected: EventEmitter<DieIndex> = new EventEmitter<DieIndex>();

  constructor() {}

  ngOnInit(): void {}

  onDieSelected($event: number): void {
    if (this.selectable) {
      this.dieSelected.emit($event as DieIndex);
    }
  }
}
