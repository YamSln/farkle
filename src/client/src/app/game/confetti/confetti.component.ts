import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChildren,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
} from '@angular/core';
import JSConfetti from 'js-confetti';

enum ConfettiType {
  WIN,
  BUST,
}

@Component({
  selector: 'app-confetti',
  templateUrl: './confetti.component.html',
  styleUrls: ['./confetti.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfettiComponent implements OnChanges, OnDestroy, OnInit {
  @Input() winningTeam: boolean = false;

  winningConfetti: any;
  bustConfetti: any;
  confettiInterval: any;
  @ViewChildren('confetti') confettiCanvas: any;

  constructor() {}

  ngOnInit(): void {
    this.winningConfetti = new JSConfetti({
      canvas: this.confettiCanvas,
    });
    this.bustConfetti = new JSConfetti({
      canvas: this.confettiCanvas,
    });
    this.triggerConfetti(ConfettiType.WIN);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.winningTeam.currentValue) {
      this.triggerConfetti(ConfettiType.WIN);
    } else {
      this.clearConfetti();
    }
  }

  triggerConfetti(type: ConfettiType): void {
    this.throwConfetti(type);
    switch (type) {
      case ConfettiType.WIN:
        let i = 1;
        this.confettiInterval = setInterval(() => {
          this.throwConfetti(type);
          i++;
          if (i > 2) {
            this.clearConfetti();
          }
        }, 1500);
        break;
    }
  }

  throwConfetti(type: ConfettiType): void {
    switch (type) {
      case ConfettiType.WIN:
        this.winningConfetti.addConfetti({
          emojis: ['🎲'],
          emojiSize: 40,
          confettiNumber: 75,
        });
        break;
      case ConfettiType.BUST:
        this.bustConfetti.addConfetti({
          emojis: ['🤬', '😡', '❌'],
          emojiSize: 40,
          confettiNumber: 40,
        });
        break;
    }
  }

  ngOnDestroy(): void {
    this.clearConfetti();
  }

  clearConfetti(): void {
    clearInterval(this.confettiInterval);
  }
}
