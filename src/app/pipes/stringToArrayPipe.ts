import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'stringToArray' })
export class StringToArrayPipe implements PipeTransform {
  transform(value: string, devider?: string): any {
    return value.split(devider ? devider : ',').map((el: string) => el.trim());
  }

  //export class ExponentialStrengthPipe implements PipeTransform {
  //transform(value: number, devider?: string): number {
    //return Math.pow(value, devider ? ',' : devider);
  }


