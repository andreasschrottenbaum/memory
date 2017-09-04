import { Component, OnInit, Inject, Optional } from '@angular/core';

import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['login-dialog.component.scss']
})
export class LoginDialogComponent {
  public dialogRef: MdDialogRef<LoginDialogComponent>;

  constructor(
      public auth: AuthService,
      public leaderboard: LeaderboardComponent,
      @Optional() @Inject(MD_DIALOG_DATA) public data: any) {
        auth.user.subscribe(userdata => {
          this.user = userdata;
        });
      }

  public user;

  loginWithFacebook(data = {}): void {
    this.auth.login('facebook').then(_ => {
      this.leaderboard.addToLeaderboard(data);
    });
  }

  loginWithGoogle(data = {}): void {
    this.auth.login('google').then(_ => {
      this.leaderboard.addToLeaderboard(data);
    });
  }

  addToLeaderboard(data): void {
    this.leaderboard.addToLeaderboard(data);
  }
}


/*@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/
