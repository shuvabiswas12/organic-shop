import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProduct: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.filteredProduct = this.products = [];

    this.subscription = this.productService.getAll().subscribe({
      next: (res) => {
        if (res) this.filteredProduct = this.products = res as Product[];
      },
    });
  }

  filter(query: string) {
    this.filteredProduct = query
      ? this.products.filter((p) =>
          p.value.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}
}
