import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './pages/home/home.module';
import { RouterModule } from '@angular/router';
import { CartModule } from './pages/cart/cart.module';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './store/user.reducer';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GuardGuard } from './auth/guard.guard';
import { FooterComponent } from './layout/footer/footer.component';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { NavComponent } from './layout/nav/nav.component';
import { CartComponent } from './layout/nav/cart/cart.component';
import { AuthSkeletonComponent } from './layout/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    SkeletonComponent,
    CartComponent,
    AuthSkeletonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HomeModule,
    CartModule,
    StoreModule.forRoot({ count: counterReducer }),
    MaterialModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthService,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
