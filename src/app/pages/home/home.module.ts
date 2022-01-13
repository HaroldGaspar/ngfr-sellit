import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
// import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from 'src/app/services/products.service';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';

//components
import { ProductComponent } from './components/product/product.component';
import { LastComponent } from './components/last/last.component';
import { PopularComponent } from './components/popular/popular.component';
import { ProductDetailComponent } from '../product-dt/components/product-detail/product-detail.component';
import { ProductDtComponent } from '../product-dt/product-dt.component';
import { ProductCommentComponent } from '../product-dt/components/product-comment/product-comment.component';
import { CommentFormComponent } from '../product-dt/components/comment-form/comment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '@services/comment.service';

@NgModule({
  declarations: [
    LastComponent,
    PopularComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductDtComponent,
    ProductCommentComponent,
    CommentFormComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [ProductsService, CommentService],
})
export class HomeModule {}
