import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-score-potential',
  templateUrl: './score-potential.component.html',
  styleUrls: ['./score-potential.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScorePotentialComponent implements OnInit, OnChanges {
  @Input() currentScore!: number;
  @Input() potentialScore!: number;
  totalScore: number = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.totalScore = this.currentScore + this.potentialScore;
  }
}
