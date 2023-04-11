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
  @Input() gameWon!: boolean;
  @Input() bust!: boolean;

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
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.gameWon && changes.gameWon.currentValue) {
      this.triggerConfetti(ConfettiType.WIN);
    } else if (changes.bust && changes.bust.currentValue) {
      this.triggerConfetti(ConfettiType.BUST);
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
      case ConfettiType.BUST:
        this.throwConfetti(ConfettiType.BUST);
        break;
    }
  }

  throwConfetti(type: ConfettiType): void {
    console.log(this.winningConfetti, this.bustConfetti);
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
