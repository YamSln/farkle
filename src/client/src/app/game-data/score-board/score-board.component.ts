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
  @Input() selfIndex!: number;

  displayedColumns: string[] = ['name', 'score'];

  constructor() {}

  ngOnInit(): void {}
}
