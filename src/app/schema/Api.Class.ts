import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShopingCartServiceService } from '../services/shoping-cart-service.service';

export class ApiClass {
  public BASE_URL = environment.backend_base_url;
  public IS_PRODUCTION = environment.production;

  constructor(protected http: HttpClient) {}

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage:${error.message}`;
    }
    return of({ error: true, msg: errorMessage, data: null });
  }

  errortx(error: HttpErrorResponse) {
    return of({ error: true, msg: error, data: null });
  }
}
