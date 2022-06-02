import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[];

  constructor(items: ShoppingCartItem[]) {
    this.items = items;
  }

  get totalSelectedItemsCount() {
    let count = 0;
    for (let productId in this.items) count += this.items[productId].quantity;
    return count;
  }

  get totalPrice(): number {
    let sum = 0;
    for (let productId in this.items) {
      if (this.items[productId].quantity) {
        sum +=
          this.items[productId].product.value.price *
          this.items[productId].quantity;
      }
    }
    return sum;
  }
}
