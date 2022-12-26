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

  @Output() themeToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() decorationsToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() popupsToggle: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onThemeToggleClick(): void {
    this.themeToggle.emit();
  }

  onDecorationsToggleClick(): void {
    this.decorationsToggle.emit();
  }

  onPopupsToggleClick(): void {
    this.popupsToggle.emit();
  }
}
