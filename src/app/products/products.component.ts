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

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService
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
          this.filteredProducts = params.get('category')
            ? this.products.filter(
                (p) => p.value.category === params.get('category')
              )
            : this.products;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}
}
