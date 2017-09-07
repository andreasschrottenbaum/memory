import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';

import { CdkTableModule } from '@angular/cdk';
import { MdTableModule, MdMenuModule } from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

import { ExacttimePipe } from '../../shared/pipes/exacttime.pipe';
import { DifficultyService } from '../../shared/services/difficulty.service';
import { ShareService } from '../../shared/services/share.service';
import { LeaderboardComponent } from './leaderboard.component';

import { environment } from '../../environments/environment';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LeaderboardComponent,
        ExacttimePipeStub
      ],
      imports:[
        MdTableModule,
        MdMenuModule,
        CdkTableModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        { provide: ExacttimePipe, useValue: ExacttimePipeStub },
        DifficultyService,
        { provide: ShareService },
        AngularFireDatabase,
        { provide: AngularFireOfflineDatabase },
        AngularFireAuth,
        { provide: AngularFireOfflineDatabase, useValue: afoDatabase }
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

@Pipe({
  name: 'exacttime'
})
export class ExacttimePipeStub implements PipeTransform {
  transform: () => {}
}

const afoDatabase = {
  list: () => {}
}