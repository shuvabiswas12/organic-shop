import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { AppUser } from '../models/AppUser';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // for working with realtime database we need to use AngularFireDatabase
  constructor(private db: AngularFireDatabase) {}

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }

  get(uid: string): Observable<AppUser> {
    return this.db
      .object('/users/' + uid)
      .valueChanges() as Observable<AppUser>;
  }
}
