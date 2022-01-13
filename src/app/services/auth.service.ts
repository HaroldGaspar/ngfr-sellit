import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredentialsDAO } from '../pages/auth/components/login/login.component';
import { User } from '../pages/auth/components/register/register.component';
import { ApiClass } from '../schema/Api.Class';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiClass {
  private isLogingSubject = new BehaviorSubject<boolean>(false);
  private storeSubject = new BehaviorSubject<number | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  get isLoging$(): Observable<boolean> {
    return this.isLogingSubject.asObservable();
  }
  get isSeller$(): Observable<number | null> {
    return this.storeSubject.asObservable();
  }
  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  stateLogin(store: number | null, token: string) {
    this.isLogingSubject.next(true);
    this.tokenSubject.next(token);
    if (store) this.storeSubject.next(store);
  }
  stateLogout() {
    this.isLogingSubject.next(false);
    this.tokenSubject.next(null);
    this.storeSubject.next(null);
  }

  // BASE_URL: string = environment.backend_base_url;

  constructor(private httpP: HttpClient) {
    super(httpP);
  }

  login(credentials: CredentialsDAO): Observable<{ token: string }> {
    return this.http
      .post<any>(`${this.BASE_URL}/authenticate`, credentials)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('token', token);
          const store = JSON.parse(atob(token.split('.')[1])).store;
          if (store) localStorage.setItem('store', store);
          this.stateLogin(store, token);
        })
      );
  }

  register(user: User): Observable<ApiResponse> {
    const response: ApiResponse = { error: false, msg: '', data: null };

    return this.http.post<User>(`${this.BASE_URL}/register`, user).pipe(
      map((res: any) => {
        console.log(res);
        response.data = res;
        return response;
      }),
      catchError(this.error)
    );
  }
}

interface ApiResponse {
  error: boolean;
  msg: string;
  data: any;
}
