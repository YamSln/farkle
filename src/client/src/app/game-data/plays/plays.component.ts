import { Component, Input, OnInit } from '@angular/core';
import { Die } from 'src/app/model/die.model';

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.scss'],
})
export class PlaysComponent implements OnInit {
  @Input() currentThrowPicks: Die[][] = [];
  @Input() currentTurnScores: number[] = [];

  displayedColumns: string[] = ['number', 'dice', 'score'];

  constructor() {}

  ngOnInit(): void {
    this.currentThrowPicks = [
      [
        { confirmed: false, joker: false, number: 1, selected: false },
        { confirmed: false, joker: true, number: 2, selected: false },
        { confirmed: false, joker: false, number: 3, selected: false },
        { confirmed: false, joker: false, number: 4, selected: false },
        { confirmed: false, joker: false, number: 5, selected: false },
        { confirmed: false, joker: false, number: 6, selected: false },
      ],
      [
        { confirmed: false, joker: false, number: 1, selected: false },
        { confirmed: false, joker: false, number: 2, selected: false },
        { confirmed: false, joker: false, number: 4, selected: false },
        { confirmed: false, joker: false, number: 6, selected: false },
      ],
      [
        { confirmed: false, joker: false, number: 2, selected: false },
        { confirmed: false, joker: false, number: 5, selected: false },
        { confirmed: false, joker: false, number: 6, selected: false },
      ],
      [
        { confirmed: false, joker: false, number: 2, selected: false },
        { confirmed: false, joker: false, number: 5, selected: false },
        { confirmed: false, joker: false, number: 6, selected: false },
      ],
      [
        { confirmed: false, joker: false, number: 2, selected: false },
        { confirmed: false, joker: false, number: 5, selected: false },
        { confirmed: false, joker: false, number: 6, selected: false },
      ],
    ];
    this.currentTurnScores = [100, 2000, 3000, 800, 500];
  }
}
