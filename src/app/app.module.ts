import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Material Design
import { MdToolbarModule, MdMenuModule, MdIconModule, MdButtonModule, MdSliderModule, MdDialogModule, MdGridListModule, MdTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk';

import { AppComponent, LoginDialog } from './app.component';

// Gesture Support for the Slider
import 'hammerjs';

// Environment
import { environment } from '../environments/environment';

// Services
import { AuthService } from '../shared/services/auth.service';
import { DifficultyService } from '../shared/services/difficulty.service';
import { ShareService } from '../shared/services/share.service';

// Pipes
import { ShufflePipe } from '../shared/pipes/shuffle.pipe';
import { ExacttimePipe } from '../shared/pipes/exacttime.pipe';

// Components
import { GameComponent } from './game/game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginDialog,
    GameComponent,
    LeaderboardComponent,
    ShufflePipe,
    ExacttimePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule,
    MdButtonModule,
    MdSliderModule,
    MdDialogModule,
    MdGridListModule,
    MdTableModule,
    CdkTableModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireOfflineModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, DifficultyService, ShufflePipe, ExacttimePipe, LeaderboardComponent, ShareService],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialog]
})
export class AppModule { }
