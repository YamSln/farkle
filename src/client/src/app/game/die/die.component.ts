import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter,
} from '@angular/core';
import { bounceInOnEnterAnimation } from 'angular-animations';
import { Die } from 'src/app/model/die.model';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInOnEnterAnimation({ duration: 1000 })],
})
export class DieComponent implements OnInit {
  @Input() die!: Die;

  @Output() click: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDieClick(): void {
    this.click.emit();
  }
}
