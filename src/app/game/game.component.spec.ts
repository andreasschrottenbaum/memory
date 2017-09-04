import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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

  it('should restart, if the difficulty is changed', async(() => {
    // TBD
  }));

  it('should trigger success, if the number of matches is equal to the difficulty', async(() => {
    // TBD
  })); 
});
