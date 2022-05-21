import { ProductService } from './../../services/product.service';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap, map } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$: any;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit(): void {}

  save(product: any) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
