import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ivaTOT',
  standalone: true
})
export class IvaTOTPipe implements PipeTransform {

  transform(value: number): number {
    return +(value*0.22).toFixed(2)
  }

}
