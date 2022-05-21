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
    return this.db.list('/products').valueChanges();
  }
}
