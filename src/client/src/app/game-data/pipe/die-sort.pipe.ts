import { Pipe, PipeTransform } from '@angular/core';
import { Die } from 'src/app/model/die.model';

@Pipe({
  name: 'dieSort',
})
export class DieSortPipe implements PipeTransform {
  transform(value: Die[], ...args: unknown[]): Die[] {
    if (value) {
      value = [...value].sort((a, b) => (a.number < b.number ? -1 : 1));
    }
    return value;
  }
}
