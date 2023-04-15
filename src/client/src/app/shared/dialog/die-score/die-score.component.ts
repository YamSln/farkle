import { Component, Input, OnInit } from '@angular/core';
import { DieFace } from '../../../../../../model/die-face.type';

@Component({
  selector: 'app-die-score',
  templateUrl: './die-score.component.html',
  styleUrls: ['./die-score.component.scss'],
})
export class DieScoreComponent implements OnInit {
  @Input() dieFace!: DieFace;
  @Input() dieScore!: number;
  @Input() joker: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  dieImage(): string {
    return `assets/dice/${this.joker ? 'j' : ''}dice_${this.dieFace || 1}.svg`;
  }
}
