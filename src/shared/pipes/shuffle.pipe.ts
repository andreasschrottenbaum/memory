import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shuffle'
})
export class ShufflePipe implements PipeTransform {
  transform(array: any[]): any[] {
    // solution from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    let counter = array.length;

    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;

      const temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }
}
