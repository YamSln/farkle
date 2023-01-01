import { Component, Input, OnInit } from '@angular/core';
import { Die } from 'src/app/model/die.model';

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.scss'],
})
export class PlaysComponent implements OnInit {
  @Input() currentThrowPicks!: Die[][];
  @Input() currentTurnScores!: number[];

  displayedColumns: string[] = ['number', 'dice', 'score'];

  constructor() {}

  ngOnInit(): void {}
}
