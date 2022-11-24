import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-score-potential',
  templateUrl: './score-potential.component.html',
  styleUrls: ['./score-potential.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScorePotentialComponent implements OnInit, OnChanges {
  currentScore: number = 0;
  potentialScore: number = 0;
  totalScore: number = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.totalScore = this.currentScore + this.potentialScore;
  }
}
