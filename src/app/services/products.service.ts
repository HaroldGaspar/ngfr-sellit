import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  mapTo,
  merge,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interface/product';
import { ICarouselItem } from '../pages/home/components/popular/popular.component';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  BASE_URL: string = environment.backend_base_url;
  items: ICarouselItem[] = [];

  private actualProductSubject = new BehaviorSubject<Product | null>(null);
  private productsSubject = new BehaviorSubject<Product[] | null>(null);
  private popProductsSubject = new BehaviorSubject<ICarouselItem[]>([]);
  get actualProduct$(): Observable<Product | null> {
    return this.actualProductSubject.asObservable();
  }
  get productsAction$(): Observable<Product[] | null> {
    return this.productsSubject.asObservable();
  }
  get popProductsAction$(): Observable<ICarouselItem[]> {
    return this.popProductsSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  getLatestProducts(page: number): Observable<Product[]> {
    // console.log('fetching latest');
    return this.http
      .get<Product[]>(`${this.BASE_URL}/products-last/${page}`)
      .pipe(tap((products) => this.productsSubject.next(products)));
  }

  getPopularProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/products-popular`).pipe(
      tap((products) => {
        this.items = [];
        products.map((product, i) => {
          const item: ICarouselItem = { id: i, product, marginLeft: 0 };
          this.items.push(item);
        }, this.popProductsSubject.next(this.items));
      })
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http
      .get<Product>(`${this.BASE_URL}/products/${id}`)
      .pipe(tap((res) => this.actualProductSubject.next(res)));
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.BASE_URL}/product/create`, product);
  }

  deleteProduct(id: string): Observable<Product> {
    console.log(id);
    return this.http.delete<Product>(
      `${this.BASE_URL}/product/delete?productID=${id}`
    );
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.BASE_URL}/product/update?productID=${id}`,
      product
    );
  }
}
