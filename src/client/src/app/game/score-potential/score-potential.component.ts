import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-potential',
  templateUrl: './score-potential.component.html',
  styleUrls: ['./score-potential.component.scss'],
})
export class ScorePotentialComponent implements OnInit {
  currentScore: number = 0;
  potentialScore: number = 0;
  totalScore: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
