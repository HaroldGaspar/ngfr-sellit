import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interface/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[] | null>;
  constructor(cartService: CartService) {
    this.products$ = cartService.products$;
    cartService.getProductsCart().subscribe();
  }

  ngOnInit(): void {}
}
