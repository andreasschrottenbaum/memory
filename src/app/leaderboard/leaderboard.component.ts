import { Component } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

import { DifficultyService } from '../../shared/services/difficulty.service';
import { ShareService } from '../../shared/services/share.service';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {
  difficulty;
  user;
  data;

  constructor(private difficultyService: DifficultyService,
              private shareService: ShareService,
              private afoDatabase: AngularFireOfflineDatabase,
              private afAuth: AngularFireAuth) {

    this.user = this.afAuth.authState;

    difficultyService.getDifficulty().subscribe(difficulty => {
      this.difficulty = difficulty;

      this.data = afoDatabase.list('/games/', {
        query: {
          orderByChild: 'difficulty',
          equalTo: difficulty
        }
      });
    });
  }

  dataSource = {
    connect: _ => {
      return Observable.create(ob => {
        this.difficultyService.getDifficulty().subscribe(() => {
          this.data.subscribe(data => {
            ob.next(this.sortByMoves(data));
          });
        });
      });
    }
  };

  sortByMoves = (data: any[]) => {
    return data.sort((obj1, obj2) => {
      if (obj1.moves < obj2.moves) { return -1; }
      if (obj1.moves > obj2.moves) { return 1; }

      if (obj1.time < obj2.time) { return -1; }
      if (obj1.time > obj2.time) { return 1; }

      return 0;
    });
  }

  addToLeaderboard(data): void {
    if (!data.difficulty) { return; }

    this.user.subscribe(userdata => {
      this.data.push({
        difficulty: data.difficulty,
        moves: data.moves,
        time: data.time,
        user: {
          uid: userdata.uid,
          name: userdata.displayName,
          pictureURL: userdata.photoURL
        }
      });
    });
  }

  share(network, data): void {
    const message = 'Ich habe ein Memory in ' + data.moves + ' Zügen gelöst! Versuch mich zu schlagen!';
    const url = 'https://memory-35dbd.firebaseapp.com/?difficulty=' + data.difficulty;
    this.shareService.share(network, message, url);
  }
}
