import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';
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
  categories$: any;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.products = [];

    this.subscription = this.productService.getAll().subscribe({
      next: (res) => {
        if (res) this.products = res as Product[];
      },
    });

    this.categories$ = this.categoryService.getCategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}
}
