import { Pipe, PipeTransform } from '@angular/core';
import { Die } from 'src/app/model/die.model';
import { DieImageService } from 'src/app/shared/service/die-image.service';

@Pipe({
  name: 'dieFace',
})
export class DieFacePipe implements PipeTransform {
  constructor(private dieImageService: DieImageService) {}
  basePath: string = 'assets/dice/';
  // Translates a die to its image url
  transform(die: Die): string {
    return this.dieImageService.getImage(die);
  }
}
