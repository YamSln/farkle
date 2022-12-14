import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubComponent implements OnInit {
  @Input() menu: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  openGithub(): void {
    window.open(environment.github, '_blank');
  }

  hasGithubLink(): boolean {
    return !!environment.github;
  }
}
