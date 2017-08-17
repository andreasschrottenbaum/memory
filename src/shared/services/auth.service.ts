import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
  }

  login(network = '') {
    if (network !== 'facebook' && network !== 'google') {
      return;
    }

    if (network === 'facebook') {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    } else if (network === 'google') {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }
}
