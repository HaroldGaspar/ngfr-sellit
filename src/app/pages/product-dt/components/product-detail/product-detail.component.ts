import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { CartDetail, Product, ProductDetail } from 'src/app/interface/product';
import { ProductsService } from 'src/app/services/products.service';
import { ShopingCartServiceService } from 'src/app/services/shoping-cart-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product$: Observable<Product | null>;
  products$: Observable<ProductDetail[] | null>;
  inCart: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private shoppingCartService: ShopingCartServiceService
  ) {
    this.id = +(route.snapshot.paramMap.get('id') || 1);
    this.product$ = productsService.actualProduct$;
    this.productsService.getProduct(this.id).subscribe();
    this.products$ = this.shoppingCartService.cartAction$;
  }

  ngOnInit(): void {
    this.shoppingCartService.cartAction$
      .pipe(
        tap((res: ProductDetail[] | null) => {
          if (res !== null)
            this.inCart =
              res.filter((res) => res.product.id === this.id).length > 0;
        })
      )
      .subscribe();
  }

  btnBuy(product: Product) {
    console.log(product);
    // this.addToCartClick.emit(this.product);
    this.shoppingCartService.updateCart({
      id: 0,
      product,
      qty: 1,
      totalPrice: product.price,
    });
    this.inCart = true;
  }
}
