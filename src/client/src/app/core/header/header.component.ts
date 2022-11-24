import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() isLightTheme!: boolean;
  @Input() roomUrl!: Observable<string>;

  @Output() themeToggle: EventEmitter<any> = new EventEmitter<any>();

  constructor(private clipboardService: ClipboardService) {}

  ngOnInit(): void {}

  onThemeToggleClick(): void {
    this.themeToggle.emit();
  }

  copyUrlToClipboard(url: string): void {
    this.clipboardService.copy(url);
  }

  openGithub(): void {
    window.open(environment.github, '_blank');
  }

  hasGithubLink(): boolean {
    return !!environment.github;
  }
}
