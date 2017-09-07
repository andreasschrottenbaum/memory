import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdDialogModule, MdDialogRef } from '@angular/material';

import { AuthService } from '../../shared/services/auth.service';

import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { LoginDialogComponent } from './login-dialog.component';

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;

  let mdDialogRefSpy = jasmine.createSpy('MdDialogRef');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDialogComponent ],
      imports: [
        MdDialogModule
      ],
      providers: [
        { provide: LeaderboardComponent },
        { provide: AuthService, useValue: AuthServiceStub },
        { provide: MdDialogRef, useValue: mdDialogRefSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

const AuthServiceStub = {
  user: {
    subscribe: () => {}
  }
}