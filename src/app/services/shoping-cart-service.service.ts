import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
  tap,
} from 'rxjs';
import { ProductDetail } from 'src/app/interface/product';
// import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/interface/product';
import { environment } from 'src/environments/environment';
import { ApiClass } from '../schema/Api.Class';

@Injectable({
  providedIn: 'root',
})
export class ShopingCartServiceService extends ApiClass {
  // products!: Product[];
  products: ProductDetail[] = [];
  // BASE_URL: string = environment.backend_base_url;

  private cartSubject = new BehaviorSubject<ProductDetail[] | null>(null);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number | null>(null);

  constructor(private httpP: HttpClient) {
    super(httpP);
  }

  //GETTERS
  get totalAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }
  get quantityAction$(): Observable<number | null> {
    return this.quantitySubject.asObservable(); //subject is biderectional, asObservable() define it
  }
  get cartAction$(): Observable<ProductDetail[] | null> {
    return this.cartSubject.asObservable();
  }

  //modify state
  private addToCart(product: ProductDetail): void {
    this.products.push(product);
    this.cartSubject.next(this.products);
  }

  private removeFromCart(product: ProductDetail): void {
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    // this.cartSubject.next(newCart);
  }

  private quatityProducts(): void {
    const quantity = this.products.length;
    this.quantitySubject.next(quantity);
  }

  private calcTotal(): void {
    const total = this.products.reduce(
      (acc, prod) => (acc += prod.totalPrice!),
      0
    );
    this.totalSubject.next(total);
  }

  //ACTIONS
  updateCart(product: ProductDetail): void {
    this.addToCart(product);
    this.quatityProducts();
    this.calcTotal();
    // PERSIST
    this.createCartDetail(product.product.id || 0).subscribe();
  }
  createCartDetail(productId: number): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/cartDetails/${productId}`, {});
  }

  removeCartDetail(pd: ProductDetail): void {
    this.removeFromCart(pd);
    this.quatityProducts();
    this.calcTotal();
    // PERSIST
    this.deleteCartDetail(pd.id).subscribe();
  }
  deleteCartDetail(cartProductId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.BASE_URL}/cartDetails/${cartProductId}`
    );
  }

  refreshCart(product: ProductDetail): void {
    // console.log(product);
    this.addToCart(product);
    this.quatityProducts();
    this.calcTotal();
  }

  updateStock(pd: number, qty: number) {
    this.calcTotal();
    // PERSIST
    this.saveStockUpdated(pd, qty).subscribe();
  }
  saveStockUpdated(productDetail: number, qty: number): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/cartDetails/${productDetail}`, {
      qty,
    });
  }

  // updateQty() {
  //   this.quatityProducts();
  // }

  getProductsCart(): Observable<ApiResponse | any> {
    this.products = [];
    const response: ApiResponse = { error: false, msg: '', data: null };

    return this.http.get<any[]>(`${this.BASE_URL}/cartDetails`).pipe(
      // tap((res) =>
      //   res.forEach((productdt: ProductDetail) => {
      //     const pd: ProductDetail = {
      //       ...productdt,
      //       totalPrice: productdt.product.price,
      //     };
      //     this.refreshCart(pd);
      //   })
      // )

      map((res: ProductDetail[]) => {
        this.cartSubject.next([]); //render that its empty
        //adapter
        const dataMapped: ProductDetail[] = res.map((productdt) => {
          const pd: ProductDetail = {
            ...productdt,
            totalPrice: productdt.product.price * productdt.qty,
          };
          this.refreshCart(pd);
          return pd;
        });
        //format
        response.data = dataMapped;
        return response;
      }),
      catchError(this.error)
    );
  }
}

export interface ApiResponse {
  error: boolean;
  msg: string;
  data: ProductDetail[] | null | any;
}
