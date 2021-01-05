import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stringToArray' })
export class StringToArrayPipe implements PipeTransform {
  transform(value: string, devider?: string): any {
    return value.split(devider ? devider : ',').map((el: string) => el.trim());
  }
  }


