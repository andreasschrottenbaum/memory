import { TestBed, async } from '@angular/core/testing';

import { GameComponent } from './game/game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

import { ExacttimePipe } from '../shared/pipes/exacttime.pipe';
import { ShufflePipe } from '../shared/pipes/shuffle.pipe';

import { AuthService } from '../shared/services/auth.service';
import { ShareService } from '../shared/services/share.service';
import { DifficultyService } from '../shared/services/difficulty.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { CdkTableModule } from '@angular/cdk';
import { MdMenuModule, MdSliderModule, MdTableModule, MdDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GameComponent,
        LeaderboardComponent,
        ExacttimePipe,
        ShufflePipe,
        LoginDialogComponent
      ],
      imports: [
        MdMenuModule,
        MdSliderModule,
        MdTableModule,
        MdDialogModule,
        FormsModule,
        CdkTableModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireOfflineModule,
        AngularFireDatabaseModule
      ],
      providers: [
        ExacttimePipe,
        ShufflePipe,
        AuthService,
        ShareService,
        DifficultyService,
        LoginDialogComponent,
        LeaderboardComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Memory'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Memory');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Memory');
  }));
});
