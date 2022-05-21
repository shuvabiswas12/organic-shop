import { Observable } from 'rxjs/internal/Observable';
import { Injectable, Query } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, tap } from 'rxjs';
import { orderBy } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  public getCategories() {
    // the second parameter of list() is for sorting data as asc order

    // this.db
    //   .object('/categories')
    //   .valueChanges()
    //   .subscribe({
    //     next: (res) => {
    //       // console.log();
    //       const parsedJson = JSON.parse(JSON.stringify(res));
    //       const keys = Object.keys(parsedJson);

    //       var arr = [];
    //       for (let i = 0; i < keys.length; i++) {
    //         const name = parsedJson[keys[i]].name;
    //         var obj: any = {};
    //         obj[`${keys[i]}`] = name;
    //         arr.push(obj);
    //       }

    //       console.log(arr);

    //       for (let i = 0; i < arr.length; i++) {
    //         console.log(Object.keys(arr[i]) + ' : ' + Object.values(arr[i]));
    //       }
    //     },
    //   });

    return this.db
      .list('/categories', (ref) => ref.orderByChild('name'))
      .valueChanges();
  }
}
