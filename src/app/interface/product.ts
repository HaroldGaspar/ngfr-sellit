export interface Product {
  id?: number;
  name: string;
  mark: string;
  description: string;
  photo: string;
  price: number;
  stock: number;
  rating: number;
}

//NO
export interface CartDetail {
  id?: number;
  qty: number;
  productId: number;
  cartId: number;
}

export interface ProductDetail {
  id: number;
  product: Product;
  qty: number;
  totalPrice?: number;
}
