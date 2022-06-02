import { ShoppingCartItem } from './../models/shopping-cart-item';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItemCount: number = 0;
  shouldSpinnerStopped: boolean = false;
  items: ShoppingCartItem[] = [];
  productIds!: any[];
  totalPrice!: number;

  constructor(private shoppingCartService: ShoppingCartService) {}

  removeCart() {
    this.shoppingCartService.removeAllItems();
  }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe({
      next: (cart) => {
        this.totalPrice = cart.totalPrice;

        this.items = cart.items;

        this.productIds = cart!.items ? Object.keys(cart.items) : [];

        //for (let productId in cart.items) {
        // this.shoppingCartItemCount =
        //   this.shoppingCartItemCount + cart.items[productId].quantity;
        //}

        this.shoppingCartItemCount = cart.totalSelectedItemsCount;

        this.shouldSpinnerStopped = true;
      },
    });
  }
}
