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

  getItem(cartID: string, productKey: string) {
    return this.db.object('/shopping-carts/' + cartID + '/items/' + productKey);
  }

  async addToCart(product: Product) {
    let cartId = (await this.getOrCreatecartID()) || '';
    let items$ = this.getItem(cartId, product.key);

    items$
      .valueChanges()
      .pipe(take(1))
      .subscribe({
        next: (item: any) =>
          items$.update({
            product: product,
            quantity: (item?.quantity || 0) + 1,
          }),
      });
  }
}
