import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { tap } from 'rxjs';
import { ShopingCartServiceService } from 'src/app/services/shoping-cart-service.service';
import { Product, ProductDetail } from '../../../../interface/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  @Input() product!: Product; //onchange
  // @Output() addToCartClick = new EventEmitter<Product>();
  isDisabled: boolean = false;
  constructor(private shoppingCartService: ShopingCartServiceService) {}

  ngOnInit(): void {
    this.shoppingCartService.cartAction$
      .pipe(
        tap((res: ProductDetail[] | null) => {
          if (res !== null)
            this.isDisabled =
              res.filter((res) => res.product.id === this.product.id).length >
              0;
        })
      )
      .subscribe();
  }

  btnBuy() {
    console.log(this.product);
    // this.addToCartClick.emit(this.product);
    this.shoppingCartService.updateCart({
      id: 0,
      product: this.product,
      qty: 1,
      totalPrice: this.product.price,
    });
    this.isDisabled = true;
  }
}
