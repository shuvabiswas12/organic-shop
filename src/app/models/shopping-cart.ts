import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[];

  constructor(items: ShoppingCartItem[]) {
    this.items = items;
  }
}
