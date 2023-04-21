import { Component, Input, OnInit } from '@angular/core';
import { DieFace } from '../../../../../../model/die-face.type';
import { DieImageService } from '../../service/die-image.service';

@Component({
  selector: 'app-die-score',
  templateUrl: './die-score.component.html',
  styleUrls: ['./die-score.component.scss'],
})
export class DieScoreComponent implements OnInit {
  @Input() dieFace: DieFace = 1;
  @Input() dieScore!: number;
  @Input() joker: boolean = false;

  constructor(private dieImageService: DieImageService) {}

  ngOnInit(): void {}

  dieImage(): string {
    return this.joker
      ? this.dieImageService.getJokerImage(this.dieFace)
      : this.dieImageService.getStandardImage(this.dieFace);
  }
}
