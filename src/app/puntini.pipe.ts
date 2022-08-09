import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'puntini',
})
export class PuntiniPipe implements PipeTransform {
  transform(value: string): string {
    let stringShort = '';
    let arrFromString = value.split('');
    for (let i = 0; i < 7; i++) {
      if (i < 5) {
        stringShort += arrFromString[i];
      } else {
        stringShort += '...';
      }
    }
    return stringShort;
  }
}
