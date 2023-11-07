import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProductResponse } from './productResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = '';
  private apiProduct = 'product';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.api = baseUrl }

  getProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.api + this.apiProduct)
    .pipe(
      tap(userData => {
        console.log('productos:', userData);
      })
    );
  }
}
