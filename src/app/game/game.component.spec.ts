import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { MdSliderModule, MdDialogModule } from '@angular/material';

import { ShufflePipe } from '../../shared/pipes/shuffle.pipe';
import { ExacttimePipe } from '../../shared/pipes/exacttime.pipe';

import { DifficultyService } from '../../shared/services/difficulty.service';

import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { GameComponent } from './game.component';

import { Card } from '../../shared/classes/card';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent,
        ExacttimePipe, ShufflePipe
      ],
      imports: [
        MdSliderModule,
        MdDialogModule,
        FormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: LoginDialogComponent },
        DifficultyService,
        // No stub, because the Pipes are used in the Component itself
        ShufflePipe,
        ExacttimePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a list of cards double the length of the difficulty', async(() => {
    const difficulty = component.difficulty;
    const deck = component.deck;

    expect(deck.length).toBe(difficulty * 2);
  }));

  it('should initialize time with "00:00"', async(() => {
    const compiled = fixture.debugElement;
    const timer = compiled.query(By.css('#timer')).nativeElement.textContent;

    expect(timer).toBe('00:00');
  }));

  it('should start the timer at the first click on a card', ((done) => {
    const compiled = fixture.debugElement;

    const card = compiled.query(By.css('.card')).nativeElement;
    card.click();

    setTimeout(() => {
      fixture.detectChanges();
      const timer = compiled.query(By.css('#timer')).nativeElement.textContent;
      expect(timer).toBe('00:01');
      done();
    }, 1000);
  }));

  it('should restart, if the difficulty is changed', ((done) => {
    const compiled = fixture.debugElement;
    const card = compiled.query(By.css('.card')).nativeElement;
    card.click();

    component.difficulty = (component.difficulty === 2) ? 4 : 2;
    component.changeDifficulty();

    setTimeout(() => {
      fixture.detectChanges();
      const timer = compiled.query(By.css('#timer')).nativeElement.textContent;
      expect(timer).toBe('00:00');
      done();
    }, 1000);
  }));

  it('should toggle the "flipped" status of the card on turn', ((done) => {
    let c1 = new Card();
    c1.motive = 'a';

    let c2 = new Card();
    c2.motive = 'b';

    component.flipCard(c1);
    expect(c1.status).toBe('flipped');

    component.flipCard(c2);
    expect(c2.status).toBe('flipped');

    setTimeout(() => {
      expect(c2.status).toBe('');
      done();
    }, 1000);
  }));

  it('should give the cards the "matched" status, if two motives match', (async() => {
    let c1 = new Card();
    let c2 = new Card();

    c1.motive = 'a';
    c2.motive = 'a';

    component.flipCard(c1);
    component.flipCard(c2);

    expect(c1.status).toBe('matched');
  }));

  // Removed for now, needs a better implementation
  /*
  it('should toggle the success flag to true, if the amount of pairs match the difficulty', (async() => {
    component.difficulty = 2;

    let c1 = new Card();
    let c2 = new Card();
    let c3 = new Card();
    let c4 = new Card();

    c1.motive = c2.motive = 'a';
    c3.motive = c4.motive = 'b';

    component.flipCard(c1);
    component.flipCard(c2);
    component.flipCard(c3);
    component.flipCard(c4);

    expect(component.success).toEqual(true);
  }));*/
});
