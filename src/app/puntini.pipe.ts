import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'puntini',
})
export class PuntiniPipe implements PipeTransform {
  transform(value: string): string {
    let dots = value.length > 15 ? '......' : '';

    return value.slice(0, 15) + dots;
  }
}
