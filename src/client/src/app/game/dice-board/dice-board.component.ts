import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DieFace } from 'src/app/model/die-face.type';
import { DieIndex } from 'src/app/model/die-index.type';
import { Die } from 'src/app/model/die.model';

@Component({
  selector: 'app-dice-board',
  templateUrl: './dice-board.component.html',
  styleUrls: ['./dice-board.component.scss'],
})
export class DiceBoardComponent implements OnInit {
  @Input() dice: Die[] = [
    { number: 1, confirmed: true, joker: false, selected: false },
    { number: 1, confirmed: false, joker: true, selected: false },
    { number: 2, confirmed: false, joker: false, selected: false },
    { number: 4, confirmed: false, joker: false, selected: true },
    { number: 5, confirmed: false, joker: false, selected: false },
    { number: 6, confirmed: false, joker: false, selected: true },
  ];

  @Output() dieClicked: EventEmitter<DieFace> = new EventEmitter<DieFace>();

  constructor() {}

  ngOnInit(): void {}

  onDieClicked($event: number): DieIndex {
    return $event as DieIndex;
  }
}
