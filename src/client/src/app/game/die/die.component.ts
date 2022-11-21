import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter,
} from '@angular/core';
import {
  bounceInOnEnterAnimation,
  flipInXOnEnterAnimation,
  headShakeOnEnterAnimation,
} from 'angular-animations';
import { Die } from 'src/app/model/die.model';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    flipInXOnEnterAnimation(),
    headShakeOnEnterAnimation(),
    bounceInOnEnterAnimation(),
  ],
})
export class DieComponent implements OnInit {
  @Input() die!: Die;

  @Output() click: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDieClick(): void {
    if (!this.die.confirmed) {
      this.die.selected = !this.die.selected;
      this.click.emit();
    }
  }
}
