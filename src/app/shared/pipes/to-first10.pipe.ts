import { SlicePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFirst10',
})
export class ToFirst10Pipe implements PipeTransform {
  transform(value: string, ...args: string[]): unknown {
    const splitt: string = value.split(' ', 2).toString().replace(',', ' ');

    return splitt.toLocaleUpperCase() + ' ' + args[0];
  }
}
