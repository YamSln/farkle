import { Injectable } from '@angular/core';

const BASE = '/assets/sound_effects/';
const WIN_SE = BASE + 'win.mp3';
const BUST_SE = BASE + 'bust.mp3';

@Injectable({ providedIn: 'root' })
export class SoundService {
  private audio = new Audio(WIN_SE);

  playWinSoundEffect(): void {
    this.playSoundEffect(WIN_SE);
  }
  playBustSoundEffect(): void {
    this.playSoundEffect(BUST_SE);
  }
  setMuted(muted: boolean): void {
    this.audio.muted = muted;
  }
  playSoundEffect(src: string): void {
    this.audio.src = src;
    this.audio.play();
  }
}
