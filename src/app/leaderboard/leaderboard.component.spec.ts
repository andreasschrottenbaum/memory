import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkTableModule } from '@angular/cdk';
import { MdTableModule, MdMenuModule } from '@angular/material';

import { ExacttimePipe } from '../../shared/pipes/exacttime.pipe';

import { DifficultyService } from '../../shared/services/difficulty.service';
import { ShareService } from '../../shared/services/share.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../../environments/environment';

import { LeaderboardComponent } from './leaderboard.component';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LeaderboardComponent,
        ExacttimePipe
      ],
      imports: [
        MdTableModule,
        CdkTableModule,
        MdMenuModule,
        AngularFireOfflineModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
      ],
      providers: [
        ExacttimePipe,
        DifficultyService,
        ShareService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
