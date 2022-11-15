import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { SharedFacade } from './shared/state/shared.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'farkle';
  events!: Subscription;

  constructor(private router: Router, private sharedFacade: SharedFacade) {}

  ngOnInit(): void {
    this.events = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event) {
          this.sharedFacade.hideLoading();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.events) {
      this.events.unsubscribe();
    }
  }
}
