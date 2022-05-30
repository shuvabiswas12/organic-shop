import { ProductService } from './../../services/product.service';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap, map } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$: any;
  product: any = {};
  productId: string = '';

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getCategories();
    this.edit();
    console.log('Product', this.product);
  }

  ngOnInit(): void {}

  edit() {
    /**
     *
     * Here is take(1) function that comes from observable.
     * This means, take 1 value then complete. means unsubscribe
     */

    this.productId = this.route.snapshot.paramMap.get('id') || '';

    if (this.productId)
      this.productService
        .get(this.productId)
        .pipe(take(1))
        .subscribe({
          next: (p) => (this.product = p),
        });
  }

  save(product: any) {
    console.log(product);

    if (this.productId) {
      // update
      this.productService.update(this.productId, this.product);
      this.router.navigate(['/admin/products']);
    } else {
      // create
      this.productService.create(product);
      this.router.navigate(['/admin/products']);
    }
  }

  delete() {
    if (!confirm('Do you want to delete this product?')) return;
    this.productService.delete(this.productId);
    this.router.navigate(['/admin/products']);
  }
}
