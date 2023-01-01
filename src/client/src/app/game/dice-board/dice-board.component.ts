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

  @Output() dieClicked: EventEmitter<DieIndex> = new EventEmitter<DieIndex>();

  constructor() {}

  ngOnInit(): void {}

  onDieClicked($event: number): void {
    this.dieClicked.emit($event as DieIndex);
  }
}
