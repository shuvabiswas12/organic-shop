import { Observable } from 'rxjs/internal/Observable';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-change-product-quantity',
  templateUrl: './change-product-quantity.component.html',
  styleUrls: ['./change-product-quantity.component.css'],
})
export class ChangeProductQuantityComponent implements OnInit, OnDestroy {
  @Input('product') product: any = {};
  cart!: ShoppingCart;
  subscription!: Subscription;
  @Input('quantity') quantity!: number;

  constructor(private shoppingCart: ShoppingCartService) {}

  addToCart() {
    this.shoppingCart.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCart.removeQuantity(this.product);
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCart.getCart()).subscribe({
      next: (cart) => (this.cart = cart),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
