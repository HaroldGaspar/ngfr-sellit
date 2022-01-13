import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MystoreRoutingModule } from './mystore-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { MystoreComponent } from './mystore.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [ProductFormComponent, MystoreComponent, ProductListComponent],
  imports: [CommonModule, MystoreRoutingModule],
})
export class MystoreModule {}
