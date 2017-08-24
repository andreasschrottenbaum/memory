import { Injectable } from '@angular/core';

import { motives } from '../data/motives';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DifficultyService {
  private _difficulty: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor () {
    const difficulty = parseInt(this.getParameterByName('difficulty'));

    if (difficulty && difficulty >= 2 && difficulty <= 13) {
      this._difficulty.next(difficulty);
    } else {
      // set random difficulty
      var diff = Math.ceil(Math.random() * motives.length / 2) * 2;

      this._difficulty.next(diff);
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
