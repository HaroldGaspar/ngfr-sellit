import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastComponent } from './components/last/last.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProductDetailComponent } from '../product-dt/components/product-detail/product-detail.component';
import { ProductDtComponent } from '../product-dt/product-dt.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'last/:page', component: LastComponent },
      { path: 'product/:id', component: ProductDtComponent },
      // { path: '**', redirectTo: '/home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
