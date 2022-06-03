import { Observable } from 'rxjs/internal/Observable';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { take, map } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

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

  async removeAllItems() {
    let cardID = await this.getOrCreatecartID();
    await this.db.object('/shopping-carts/' + cardID + '/items').remove();
  }

  private async getOrCreatecartID(): Promise<string> {
    let cartId = await localStorage.getItem('cartId');
    if (cartId) return cartId;

    // create carts and return the cartID
    let result = this.create();
    localStorage.setItem('cartId', result.key || '');
    return result.key || '';
  }

  private getItem(cartID: string, productKey: string) {
    return this.db.object('/shopping-carts/' + cartID + '/items/' + productKey);
  }

  // Instead of angularFireOvservableObject we are using angularFireObject<> here.
  // async getCart(): Promise<AngularFireObject<ShoppingCart>> {
  //   let cartID = await this.getOrCreatecartID();
  //   return this.db.object('/shopping-carts/' + cartID);
  // }

  // by rich model's way...
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartID = await this.getOrCreatecartID();
    return this.db
      .object('/shopping-carts/' + cartID)
      .valueChanges()
      .pipe(map((cart) => new ShoppingCart((cart as any).items)));

    // this is how rich model works. if we have not write 'new ShoppingCart()' here
    // then rich model functionality will not work
  }

  async getShoppingCartItemsCount() {
    return (await this.getCart()).pipe(
      map((cart) => {
        let shoppingCartItemCount = 0;
        for (let productId in cart.items) {
          shoppingCartItemCount =
            shoppingCartItemCount + cart.items[productId].quantity;
        }
        return shoppingCartItemCount;
      })
    );
  }

  removeQuantity(product: Product) {
    this.updateChanges(product, -1);
  }

  addToCart(product: Product) {
    this.updateChanges(product, 1);
  }

  private async updateChanges(product: Product, changes: number) {
    let cartId = (await this.getOrCreatecartID()) || '';
    let items$ = this.getItem(cartId, product.key);

    items$
      .valueChanges()
      .pipe(take(1))
      .subscribe({
        next: (item: any) => {
          let quantity = (item?.quantity || 0) + changes;
          if (quantity === 0) items$.remove();
          else
            items$.update({
              product: product,
              quantity: quantity,
            });
        },
      });
  }
}
