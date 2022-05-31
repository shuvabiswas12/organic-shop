import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private async getOrCreatecartID() {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    // create carts and return the cartID
    let result = await this.create();
    localStorage.setItem('cartId', result.key || '');
    return result.key;
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreatecartID();
    let items$ = this.db.object(
      '/shopping-carts/' + cartId + '/items/' + product.key
    );

    if (items$) {
      items$
        .valueChanges()
        .pipe(take(1))
        .subscribe({
          next: (item: any) => {
            if (item) {
              items$.update({
                quantity: item.quantity + 1,
              });
            } else {
              items$.set({ product: product, quantity: 1 });
            }
          },
        });
    }
  }
}
