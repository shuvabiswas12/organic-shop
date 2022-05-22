import { map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: any) {
    this.db.list('/products').push(product);
  }

  getAll() {
    /**
     * spanpshotChanges() has metadata but valueChanges() does not that.
     * that is why, snapshotChanges() has the key of a firebase object.
     */

    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, value: c.payload.val() }))
        )
      );
  }
}
