import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../app.component';

import { DifficultyService } from '../../shared/services/difficulty.service';

import { ShufflePipe } from '../../shared/pipes/shuffle.pipe';
import { ExacttimePipe } from '../../shared/pipes/exacttime.pipe';

import { motives } from '../../shared/data/motives';
import { Card } from '../../shared/classes/card';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  private _moves: number;
  private _matches: number;
  private _currentCard: Card;
  private _locked: boolean;
  private _timer: any;
  private _starttime: Date;

  public difficulty: number;
  public time: number = -(60 * 60 * 1000);
  public deck: Card[] = [];
  public maxLevel = motives.length;
  public success: boolean;

  constructor(public app: AppComponent,
              public difficultyService: DifficultyService,
              public shuffle: ShufflePipe,
              public exacttime: ExacttimePipe) {
    difficultyService.getDifficulty().subscribe(difficulty => {
      this.difficulty = difficulty;
    });
  }

  ngOnInit() {
    this._buildDeck();
  }

  changeDifficulty(): void {
    this.difficultyService.setDifficulty(this.difficulty);
    this._buildDeck();
  }

  login(): void {
    const dialogRef = this.app.showLoginDialog();
  }

  // Main method for the game
  flipCard(card: Card): void {
    if (card.status === 'flipped' || card.status === 'matched' || this._locked) {
      return;
    }

    if (this._timer === null) {
      this._starttime = new Date();
      this._timer = setInterval(_ => {
        this.time += 1000;
      }, 1000);
    }

    card.status = 'flipped';

    if (this._currentCard === null) {
      this._currentCard = card;
      return;
    }

    this._moves++;

    if (this._currentCard.motive === card.motive) {
      this._currentCard.status = 'matched';
      card.status = 'matched';

      this._matches++;

      this._currentCard = null;
    } else {
      this._locked = true;

      setTimeout(_ => {
        this._currentCard.status = '';
        card.status = '';

        this._locked = false;
        this._currentCard = null;
      }, 1000);
    }

    if (this._matches === this.difficulty) {
      clearInterval(this._timer);
      this.success = true;

      const endtime = new Date();
      const exacttime = endtime.getTime() - this._starttime.getTime();

      this.time = -(60 * 60 * 1000) + exacttime;

      const dialog = this.app.showLoginDialog({
        difficulty: this.difficulty,
        moves: this._moves,
        time: this.time,
        exacttime: this.exacttime.transform(this.time, true)
      });

      dialog.afterClosed().subscribe(_ => { this._buildDeck(); });
    }
  }

  private _buildDeck(): void {
    clearInterval(this._timer);

    // Reset internal variables
    this._moves = 0;
    this._matches = 0;
    this._currentCard = null;
    this._locked = false;
    this._timer = null;
    this._starttime = null;

    this.success = false;
    this.deck = [];
    this.time = -(60 * 60 * 1000);

    const motiveArr = this.shuffle.transform(motives).slice(0, this.difficulty);

    motiveArr.forEach(element => {
      const card: Card = {
        motive: element,
        status: ''
      };
      this.deck.push(card);

      const duplicatedCard: Card = {
        motive: element,
        status: ''
      };
      this.deck.push(duplicatedCard);
    });
  }
}
