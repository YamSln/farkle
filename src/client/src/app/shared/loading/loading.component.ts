import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';
import { Observable } from 'rxjs';
import { SharedFacade } from '../state/shared.facade';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInOnEnterAnimation({ duration: 500 }),
    fadeOutOnLeaveAnimation({ duration: 500 }),
  ],
})
export class LoadingComponent implements OnInit {
  displayLoading!: Observable<boolean>;
  isLightTheme!: Observable<boolean>;
  constructor(private facade: SharedFacade) {}

  ngOnInit(): void {
    this.displayLoading = this.facade.getLoading();
    this.isLightTheme = this.facade.getIsLightTheme();
  }
}
