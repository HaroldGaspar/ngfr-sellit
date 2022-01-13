import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
  declarations: [
    CartComponent,
    CartDetailComponent,
    InvoiceDetailComponent,
    ProductDetailComponent,
  ],
  imports: [CommonModule, CartRoutingModule],
})
export class CartModule {}
