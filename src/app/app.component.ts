import { Component, Inject } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { ShareService } from '../shared/services/share.service';

import { AfoObjectObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { LeaderboardComponent } from './leaderboard/leaderboard.component';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user;

  showLoginDialog(data = {}): MdDialogRef<LoginDialog> {
    const dialogRef = this.dialog.open(LoginDialog, { data: data });
    return dialogRef;
  }

  logout(): void {
    this.auth.logout();
  }

  constructor (private auth: AuthService,
  public dialog: MdDialog,
  public afoDatabase: AngularFireOfflineDatabase,
  public shareService: ShareService) {
    auth.user.subscribe(userdata => this.user = userdata);

    // It's needed to load the Social Network SDKs onload for preventing blocked pop-ups
    shareService.initNetwork('facebook');
    shareService.initNetwork('google');
  }
}


@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
  styleUrls: ['login-dialog.scss']
})
export class LoginDialog {
  constructor(
      public dialogRef: MdDialogRef<LoginDialog>,
      public auth: AuthService,
      public leaderboard: LeaderboardComponent,
      @Inject(MD_DIALOG_DATA) public data: any) {
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