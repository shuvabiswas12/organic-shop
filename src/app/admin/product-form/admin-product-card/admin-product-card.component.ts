import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-product-card',
  templateUrl: './admin-product-card.component.html',
  styleUrls: ['./admin-product-card.component.css'],
})
export class AdminProductCardComponent implements OnInit {
  @Input('product') product: any = {};

  constructor() {}

  ngOnInit(): void {}
}
