import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() isLightTheme!: boolean;
  @Input() roomUrl!: Observable<string>;
  @Input() timer: Observable<number> = of(1);

  @Output() themeToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() menuToggle: EventEmitter<any> = new EventEmitter<any>();

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
}
