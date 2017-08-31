import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdSliderModule, MdTableModule, MdMenuModule, MdDialogModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

import { FormsModule } from '@angular/forms';

import { ExacttimePipe } from '../../shared/pipes/exacttime.pipe';
import { ShufflePipe } from '../../shared/pipes/shuffle.pipe';

import { AuthService } from '../../shared/services/auth.service';
import { DifficultyService } from '../../shared/services/difficulty.service';
import { ShareService } from '../../shared/services/share.service';

import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { GameComponent } from './game.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';

import { environment } from '../../environments/environment';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        LeaderboardComponent,
        ExacttimePipe,
        ShufflePipe
      ],
      imports: [
        MdSliderModule,
        MdTableModule,
        MdMenuModule,
        MdDialogModule,
        FormsModule,
        CdkTableModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireOfflineModule,
        AngularFireDatabaseModule
      ],
      providers: [
        LeaderboardComponent,
        LoginDialogComponent,
        AuthService,
        DifficultyService,
        ShareService,
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
});
