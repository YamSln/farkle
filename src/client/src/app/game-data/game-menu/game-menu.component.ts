import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
