import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-decorations-toggle',
  templateUrl: './decorations-toggle.component.html',
  styleUrls: ['./decorations-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecorationsToggleComponent implements OnInit {
  @Input() decorations!: boolean;

  @Output() decorationsToggle: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onToggleChange(): void {
    this.decorationsToggle.emit();
  }
}
