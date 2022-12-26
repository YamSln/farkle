import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-popups-toggle',
  templateUrl: './popups-toggle.component.html',
  styleUrls: ['./popups-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupsToggleComponent implements OnInit {
  @Input() popups!: boolean;

  @Output() popupsToggle: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  onToggleChange(): void {
    this.popupsToggle.emit();
  }
}
