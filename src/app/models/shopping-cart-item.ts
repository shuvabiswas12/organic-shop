import { Product } from 'src/app/models/Product';

export interface ShoppingCartItem {
  product: Product;
  quantity: number;
}
