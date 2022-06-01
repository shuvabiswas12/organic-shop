import { ShoppingCartService } from './../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  selectedCategory: string | null = null;
  subscription2: any = null;
  cart: any;

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private shoppingCart: ShoppingCartService
  ) {
    this.products = [];
    this.filteredProducts = [];

    this.subscription = this.productService
      .getAll()
      .pipe(
        switchMap((product) => {
          this.products = product as Product[];
          return this.router.queryParamMap;
        })
      )
      .subscribe({
        next: (params) => {
          this.selectedCategory = params.get('category');
          this.filteredProducts = this.selectedCategory
            ? this.products.filter(
                (p) => p.value.category === this.selectedCategory
              )
            : this.products;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  async ngOnInit() {
    this.subscription2 = (await this.shoppingCart.getCart()).subscribe({
      next: (cart) => (this.cart = cart),
    });
  }
}
