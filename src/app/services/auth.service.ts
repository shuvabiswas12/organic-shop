import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    // if someone hits such an url that has login access, then we should save that url in the local storage
    // after that, after server response we can send theat user to that particular page.

    // this returnUrl name that we were selected in the auth gueard service as an optional route.

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }
}
