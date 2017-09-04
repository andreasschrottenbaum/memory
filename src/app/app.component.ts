import { Component, Inject } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { ShareService } from '../shared/services/share.service';

import { MdDialog, MdDialogRef } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user;
  title = 'Memory';

  showLoginDialog(data = {}): MdDialogRef<LoginDialogComponent> {
    const dialogRef = this.dialog.open(LoginDialogComponent, { data: data });
    return dialogRef;
  }

  logout(): void {
    this.auth.logout();
  }

  constructor (private auth: AuthService,
  public dialog: MdDialog,
  public shareService: ShareService) {
    auth.user.subscribe(userdata => this.user = userdata);

    // It's needed to load the Social Network SDKs onload for preventing blocked pop-ups
    shareService.initNetwork('facebook');
    shareService.initNetwork('google');
  }
}
