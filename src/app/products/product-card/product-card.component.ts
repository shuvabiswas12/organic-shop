import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Product } from './../../models/Product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: any = {};

  constructor(private cartService: ShoppingCartService) {}

  addToCart(addedProduct: Product) {
    this.cartService.addToCart(addedProduct);
  }

  ngOnInit(): void {}
}
