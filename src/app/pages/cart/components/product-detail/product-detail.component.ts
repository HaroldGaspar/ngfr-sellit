import { Component, Input, OnInit } from '@angular/core';
import { ProductDetail } from 'src/app/interface/product';
import { Product } from 'src/app/interface/product';
import { ShopingCartServiceService } from 'src/app/services/shoping-cart-service.service';

@Component({
  selector: 'app-product-detail, [app-product-detail]',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  @Input() productDT!: ProductDetail;
  constructor(private shopingCartService: ShopingCartServiceService) {}

  ngOnInit(): void {}

  handleQty(add: boolean) {
    console.log('changing ', add);
    const totalP = this.productDT.totalPrice!;
    const price = this.productDT.product.price;
    const qty = this.productDT.qty;

    this.productDT.qty = add ? qty + 1 : qty - 1;
    this.productDT.totalPrice = add ? totalP + price : totalP - price;
    this.shopingCartService.updateStock(this.productDT.id, this.productDT.qty);
  }

  delete() {
    console.log('id', this.productDT.id);
    this.shopingCartService.removeCartDetail(this.productDT);
  }
}
