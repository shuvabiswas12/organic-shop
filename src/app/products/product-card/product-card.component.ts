import { ShoppingCart } from './../../models/shopping-cart';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: any = {};
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  getQuantity() {
    if (!this.shoppingCart) return 0;
    console.log('Shopping cart', this.shoppingCart);

    if (this.shoppingCart?.items !== undefined) {
      let item = this.shoppingCart?.items[this.product.key];
      return item ? item?.quantity : 0;
    } else {
      return 0;
    }
  }

  ngOnInit(): void {}
}
