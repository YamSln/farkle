import { Injectable } from '@angular/core';

const STORAGE_THEME_KEY = '__light_theme__';
const STORAGE_SOUND_KEY = '__sound__';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  isLightTheme(): boolean {
    return localStorage.getItem(STORAGE_THEME_KEY) == 'true';
  }
  isMuted(): boolean {
    return localStorage.getItem(STORAGE_SOUND_KEY) == 'true';
  }
  setLightTheme(light: boolean): void {
    localStorage.setItem(STORAGE_THEME_KEY, String(light));
  }
  setMuted(mute: boolean): void {
    localStorage.setItem(STORAGE_SOUND_KEY, String(mute));
  }
}
