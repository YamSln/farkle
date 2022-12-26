import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-option-menu',
  templateUrl: './option-menu.component.html',
  styleUrls: ['./option-menu.component.scss'],
})
export class OptionMenuComponent implements OnInit {
  @Input() version!: string;
  @Input() inGame!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
