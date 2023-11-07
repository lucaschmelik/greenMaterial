import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { InvoiceResponse } from './invoiceResponse';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private api = '';
  private controllerProduct = 'product';
  private controllerInvoice = 'invoice';

  private stateInvoice: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  
  constructor(private http: HttpClient, private loginService: LoginService, @Inject('BASE_URL') baseUrl: string) { this.api = baseUrl }

  getProductsCurrentShippingCart(): Observable<InvoiceResponse[]> {
    return this.http.get<InvoiceResponse[]>(`${this.api + this.controllerProduct}/ByCurrentShippingCart?userId=${this.loginService.userIdLogin}`)
  }

  deleteItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.api + this.controllerProduct}/DeleteItem?itemId=${itemId}`)
  }

  updateInvoice(nextState: number) : Observable<any> {
    return this.http.put(`${this.api + this.controllerInvoice}/ChangeState?userId=${this.loginService.userIdLogin}&nextState=${nextState}`, null)
  }

  HasInvoiceByStateAndUser() : Observable<number> {
    return this.http.get<number>(`${this.api + this.controllerInvoice}/HasInvoiceByStateAndUser?userId=${this.loginService.userIdLogin}`)
    .pipe(
      tap(response => {
        if(response != 0){
          this.stateInvoice.next(response);
        }
    }))
  }

  get hasCurrentInvoice(): number{
    return this.stateInvoice.value
  }
}
