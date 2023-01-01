import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum',
})
export class SumPipe implements PipeTransform {
  transform(arr: number[]): number {
    if (arr) {
      return arr.reduce((prev, current) => prev + current, 0);
    }
    return 0;
  }
}
