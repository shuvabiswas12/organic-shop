import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Route, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs/internal/Observable';
import { AppUser } from '../models/AppUser';
import { catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private routeNavigate: Router
  ) {
    this.user$ = this.afAuth.authState;
  }

  async login() {
    // if someone hits such an url that has login access, then we should save that url in the local storage
    // after that, after server response we can send theat user to that particular page.

    // this returnUrl name that we were selected in the auth gueard service as an optional route.

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (returnUrl) localStorage.setItem('returnUrl', returnUrl);
    else localStorage.removeItem('returnUrl');

    const guser = await this.afAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    // @ts-ignore
    this.saveToken(guser.credential?.accessToken);
    this.routeNavigate.navigate(['/']);
  }

  saveToken(token: any) {
    localStorage.setItem('TOKEN', JSON.stringify(token));
  }

  isTokenAvailable() {
    return localStorage.getItem('TOKEN') != null;
  }

  logout() {
    this.afAuth.signOut();
    localStorage.removeItem('TOKEN');
  }

  get appUser$() {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user.uid);
        return of(null);
      })
    );
  }
}
