import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopingCartServiceService } from 'src/app/services/shoping-cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  quantity$: Observable<number | null>;
  total$ = this.shoppingCartService.totalAction$; //observable required async pipe

  constructor(private shoppingCartService: ShopingCartServiceService) {
    this.quantity$ = this.shoppingCartService.quantityAction$;
    this.shoppingCartService.getProductsCart().subscribe();
  }
  ngOnInit(): void {}
}
