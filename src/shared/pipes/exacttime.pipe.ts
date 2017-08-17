import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exacttime'
})
export class ExacttimePipe implements PipeTransform {

  transform(timestamp: number, showMilliseconds: boolean): any {
    if (!timestamp) {
      return false;
    }

    const date = new Date (timestamp);

    let time = ('0' + date.getMinutes()).slice(-2) + ':'
          + ('0' + date.getSeconds()).slice(-2);

    if (showMilliseconds) {
      time += ':' + ('00' + date.getMilliseconds()).slice(-3);
    }

    return time;
  }

}
