import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DifficultyService {
  private _difficulty: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor () {
    const difficulty = parseInt(this.getParameterByName('difficulty'));

    if (difficulty && difficulty >= 2 && difficulty <= 13) {
      this._difficulty.next(difficulty);
    } else {
      this._difficulty.next(2);
    }
  }

  getDifficulty(): BehaviorSubject<number> {
    return this._difficulty;
  }

  setDifficulty(difficulty: number): void {
    this._difficulty.next(difficulty);
  }

  private getParameterByName(name, url = ''): string {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
}
