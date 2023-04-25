import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() isLightTheme!: boolean;
  @Input() roomUrl!: string;
  @Input() time!: number;
  @Input() host!: boolean;
  @Input() muted!: boolean;

  @Output() themeToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() muteToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() menuToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() timeChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private clipboardService: ClipboardService) {}

  ngOnInit(): void {}

  onThemeToggleClick(): void {
    this.themeToggle.emit();
  }

  onMenuToggleClick(): void {
    this.menuToggle.emit();
  }

  copyUrlToClipboard(url: string): void {
    this.clipboardService.copy(url);
  }

  onTimeChange($event: any): void {
    this.timeChange.emit($event);
  }

  onMuteToggle(): void {
    this.muteToggle.emit();
  }
}
