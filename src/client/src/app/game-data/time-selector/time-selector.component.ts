import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeSelectorComponent implements OnInit {
  @Input() time: number = 0;
  @Input() host!: boolean;
  @Input() menu: boolean = false;

  @Output() timeSet: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onTimeChange($event: number): void {
    this.timeSet.emit($event);
  }
}
