import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthSkeletonComponent } from './layout/auth/auth.component';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';

const routes: Routes = [
  {
    path: '',
    component: SkeletonComponent,
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    component: SkeletonComponent,
    loadChildren: () =>
      import('./pages/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: '',
    component: AuthSkeletonComponent,
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: SkeletonComponent,
    loadChildren: () =>
      import('./pages/mystore/mystore.module').then((m) => m.MystoreModule),
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
