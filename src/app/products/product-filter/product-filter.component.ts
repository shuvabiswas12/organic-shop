import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
  categories$: any;
  selectedCategory: string | null = null;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.categoryService.getCategories();
    this.route.queryParamMap.subscribe({
      next: (params) => (this.selectedCategory = params.get('category')),
    });
  }

  ngOnInit(): void {}
}
