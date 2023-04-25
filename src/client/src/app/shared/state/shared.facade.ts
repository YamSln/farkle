import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  displayErrorMessage,
  displayLoading,
  toggleMute,
  toggleTheme,
} from './shared.action';
import {
  getErrorMessage,
  getIsLightTheme,
  getIsMuted,
  getLoadingStatus,
  getPlayerAction,
} from './shared.selector';
import { SharedState } from './shared.state';

@Injectable({ providedIn: 'root' })
export class SharedFacade {
  constructor(private store: Store<SharedState>) {}

  getLoading(): Observable<boolean> {
    return this.store.select(getLoadingStatus);
  }

  getErrorMessage(): Observable<string> {
    return this.store.select(getErrorMessage);
  }

  getPlayerAction(): Observable<string> {
    return this.store.select(getPlayerAction);
  }

  getIsLightTheme(): Observable<boolean> {
    return this.store.select(getIsLightTheme);
  }

  getIsMuted(): Observable<boolean> {
    return this.store.select(getIsMuted);
  }

  toggleMute(): void {
    this.store.dispatch(toggleMute());
  }

  displayLoading(): void {
    this.alterLoadingStatus(true);
  }

  hideLoading(): void {
    this.alterLoadingStatus(false);
  }

  displayError(message: string): void {
    this.store.dispatch(displayErrorMessage({ message }));
  }

  clearError(): void {
    this.store.dispatch(displayErrorMessage({ message: '' }));
  }

  toggleTheme(): void {
    this.store.dispatch(toggleTheme());
  }

  private alterLoadingStatus(status: boolean) {
    this.store.dispatch(displayLoading({ status }));
  }
}
