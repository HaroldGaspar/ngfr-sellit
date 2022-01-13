import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interface/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  BASE_URL: string = environment.backend_base_url;

  private productsSubject = new BehaviorSubject<Product[] | null>(null);
  get products$(): Observable<Product[] | null> {
    return this.productsSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  getProductsCart(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.BASE_URL}/products`)
      .pipe(tap((products) => this.productsSubject.next(products)));
  }
}
