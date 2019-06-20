import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobType'
})
export class JobTypePipe implements PipeTransform {

 
  transform(value: any, args?: any): any {
    return MapConstrant[value];
  }
}
export const MapConstrant = {
  O: 'Operate',
  M: 'Manage'
};
