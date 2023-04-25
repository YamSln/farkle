import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsMenuComponent implements OnInit {
  @Input() isLightTheme!: boolean;
  @Input() host!: boolean;
  @Input() time!: number;
  @Input() timeChangable!: boolean;
  @Input() muted!: boolean;

  @Output() themeToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() muteToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() decorationsToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() popupsToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() timeChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onThemeToggleClick(): void {
    this.themeToggle.emit();
  }

  onMuteToggle(): void {
    this.muteToggle.emit();
  }

  onDecorationsToggleClick(): void {
    this.decorationsToggle.emit();
  }

  onPopupsToggleClick(): void {
    this.popupsToggle.emit();
  }

  onTimeChange($event: any): void {
    this.timeChange.emit($event);
  }
}
