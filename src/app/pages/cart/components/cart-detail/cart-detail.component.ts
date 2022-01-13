import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetail } from 'src/app/interface/product';
import { Product } from 'src/app/interface/product';
import { ShopingCartServiceService } from 'src/app/services/shoping-cart-service.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
})
export class CartDetailComponent implements OnInit {
  total$!: Observable<number>;
  cart$: Observable<ProductDetail[] | null>;
  qty$: Observable<number | null>;
  constructor(private shopingCartService: ShopingCartServiceService) {
    this.total$ = shopingCartService.totalAction$;
    this.cart$ = shopingCartService.cartAction$;
    this.qty$ = shopingCartService.quantityAction$;
  }

  ngOnInit(): void {}
}
