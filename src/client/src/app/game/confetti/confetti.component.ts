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

@Component({
  selector: 'app-confetti',
  templateUrl: './confetti.component.html',
  styleUrls: ['./confetti.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfettiComponent implements OnChanges, OnDestroy, OnInit {
  @Input() winningTeam: boolean = false;

  winningConfetti: any;
  confettiInterval: any;
  @ViewChildren('confetti') confettiCanvas: any;

  constructor() {}

  ngOnInit(): void {
    this.winningConfetti = new JSConfetti({
      canvas: this.confettiCanvas,
    });
    this.triggerConfetti();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.winningTeam.currentValue) {
      this.triggerConfetti();
    } else {
      this.clearConfetti();
    }
  }

  triggerConfetti(): void {
    this.throwConfetti();
    let i = 1;
    this.confettiInterval = setInterval(() => {
      this.throwConfetti();
      i++;
      if (i > 2) {
        this.clearConfetti();
      }
    }, 1500);
  }

  throwConfetti(): void {
    this.winningConfetti.addConfetti({
      emojis: ['🎲'],
      emojiSize: 40,
      confettiNumber: 75,
    });
  }

  ngOnDestroy(): void {
    this.clearConfetti();
  }

  clearConfetti(): void {
    clearInterval(this.confettiInterval);
  }
}
