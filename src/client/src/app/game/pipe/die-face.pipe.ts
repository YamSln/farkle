import { Pipe, PipeTransform } from '@angular/core';
import { Die } from 'src/app/model/die.model';

@Pipe({
  name: 'dieFace',
})
export class DieFacePipe implements PipeTransform {
  basePath: string = 'assets/dice/';
  transform(die: Die, ...args: string[]): string {
    return (
      this.basePath +
      (die.joker
        ? 'j' // Joker
        : '') +
      'dice_' +
      die.number +
      (die.selected ? '_selected' : '') +
      '.svg'
    );
  }
}
