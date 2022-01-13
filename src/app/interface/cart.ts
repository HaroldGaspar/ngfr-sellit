import { Product } from 'src/app/interface/product';

export interface Cart {
  id?: number;
  totalPrice: string;
  cartDetails: Product[];
}
