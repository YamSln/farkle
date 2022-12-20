import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Player } from 'src/app/model/player.model';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreBoardComponent implements OnInit {
  @Input() players!: Player[];
  @Input() playing!: string;

  displayedColumns: string[] = ['name', 'score'];

  constructor() {}

  ngOnInit(): void {
    this.playing = 'bebs';
    this.players = [
      { host: true, id: '12', nick: 'bebs', points: 2000 },
      { host: false, id: '13', nick: 'nib', points: 1000 },
      { host: false, id: '14', nick: 'jam', points: 3000 },
      { host: false, id: '15', nick: 'ej', points: 5000 },
      { host: false, id: '16', nick: 'noor', points: 4000 },
      { host: false, id: '16', nick: 'noor', points: 4000 },
    ];
  }
}
