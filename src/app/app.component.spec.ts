import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MdMenuModule, MdDialogModule } from '@angular/material';

import { AuthService } from '../shared/services/auth.service';
import { ShareService } from '../shared/services/share.service';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockGameComponent, MockLeaderboardComponent
      ],
      providers: [
        { provide: GameComponent },
        { provide: LeaderboardComponent },
        { provide: AuthService, useValue: AuthServiceStub },
        { provide: ShareService, useValue: ShareServiceStub }
      ],
      imports: [
        MdMenuModule,
        MdDialogModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.debugElement;
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Memory'`, async(() => {
    expect(app.title).toEqual('Memory');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    expect(compiled.query(By.css('h1')).nativeElement.textContent).toBe('Memory');
  }));

  it('should have the title dynamically', async(() => {
    app.title = 'Test Title';
    fixture.detectChanges();
    expect(compiled.query(By.css('h1')).nativeElement.textContent).toBe('Test Title');
  }));

  it('should render the menu button', async(() => {
    fixture.detectChanges();
    expect(compiled.query(By.css('md-icon')).nativeElement.textContent).toBe('more_vert');
  }));
});

// Mocks and Stubs
@Component({
  selector: 'app-game',
  template: ''
})
class MockGameComponent {}

@Component({
  selector: 'app-leaderboard',
  template: ''
})
class MockLeaderboardComponent {}

const AuthServiceStub = {
  user: {
    subscribe: () => {}
  }
};

const ShareServiceStub = {
  initNetwork: () => {}
};
