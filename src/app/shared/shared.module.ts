import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToFirst10Pipe } from './pipes/to-first10.pipe';
import { NavComponent } from '../layout/nav/nav.component';
import { MaterialModule } from './material.module';
import { MainBgDirective } from './directives/main-bg.directive';
import { CartComponent } from '../layout/nav/cart/cart.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthInterceptor } from '../auth/interceptor';
import { ProductLoadersComponent } from './components/product-loaders/product-loaders.component';

@NgModule({
  declarations: [ToFirst10Pipe, MainBgDirective, ProductLoadersComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [
    ToFirst10Pipe,
    MainBgDirective,
    FormsModule,
    RouterModule,
    ProductLoadersComponent,
  ], //compartir con el app module, para no declararlo ahi
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
