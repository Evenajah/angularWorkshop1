import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderPipe'
})
export class GenderPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return MapConstrant[value];
  }
}
export const MapConstrant = {
  M: 'Male',
  F: 'Female'
};

