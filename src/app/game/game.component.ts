import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger, animateChild } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { AppComponent } from '../app.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

import { MdDialog } from '@angular/material';

import { DifficultyService } from '../../shared/services/difficulty.service';

import { ShufflePipe } from '../../shared/pipes/shuffle.pipe';
import { ExacttimePipe } from '../../shared/pipes/exacttime.pipe';

import { motives } from '../../shared/data/motives';
import { Card } from '../../shared/classes/card';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    // code from https://medium.com/@gerard.sans/angular-applying-motion-principles-to-a-list-d5cdd35c899e
    // Currently not implemented due to cross-browser issues
    trigger('cards', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0, left: 0 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', 
          style({ transform: 'scale(1)', opacity: 1, left: '*' }))  // final
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', 
        style({ 
          transform: 'scale(0.5)', opacity: 0, 
          height: '0px', margin: '0px' 
        })) 
      ])
    ]),
    trigger('list', [
      transition(':enter', [
        query('@cards', stagger(200, animateChild()))
      ])
    ])
  ]
})
export class GameComponent implements OnInit {
  private _matches: number;
  private _currentCard: Card;
  private _locked: boolean;
  private _timer: any;
  private _starttime: Date;

  public moves: number;
  public difficulty: number;
  public time: number = -(60 * 60 * 1000);
  public deck: Card[] = [];
  public maxLevel = motives.length;
  public success: boolean;

  constructor(public loginDialog: LoginDialogComponent,
              public difficultyService: DifficultyService,
              public shuffle: ShufflePipe,
              public exacttime: ExacttimePipe,
              public dialog: MdDialog) {
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

  // Main method for the game
  flipCard(card: Card): void {
    if (card.status === 'flipped' || card.status === 'matched' || this._locked) {
      return;
    }

    // Start the timer
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

    this.moves++;

    // Match
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

    // Finished the game
    if (this._matches === this.difficulty) {
      clearInterval(this._timer);
      this.success = true;

      const endtime = new Date();
      const exacttime = endtime.getTime() - this._starttime.getTime();

      this.time = -(60 * 60 * 1000) + exacttime;

      const dialogRef = this.dialog.open(LoginDialogComponent, { data: {
        difficulty: this.difficulty,
        moves: this.moves,
        time: this.time,
        exacttime: this.exacttime.transform(this.time, true)
      }});

      dialogRef.afterClosed().subscribe(_ => { this._buildDeck(); });
    }
  }

  private _buildDeck(): void {
    clearInterval(this._timer);

    // Reset internal variables
    this.moves = 0;
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
