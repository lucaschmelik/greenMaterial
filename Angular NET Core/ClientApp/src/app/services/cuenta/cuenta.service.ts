import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginService } from '../auth/login.service';
import { tap } from 'rxjs';
import { CarritoService } from '../carrito/carrito.service';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private api = '';
  private controllerInvoice = 'invoice';

  constructor(private http: HttpClient, private loginService: LoginService, private carritoService: CarritoService, @Inject('BASE_URL') baseUrl: string) { this.api = baseUrl }

  GetInvoicesByUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api + this.controllerInvoice}/ByUser?userId=${this.loginService.userIdLogin}`);
  }

  DeleteInvoices(id: number): Observable<any> {
    return this.http.delete(`${this.api + this.controllerInvoice}?invoiceId=${id}`).pipe(
      tap( () => this.carritoService.HasInvoiceByStateAndUser().subscribe())
    );
  }

  GetTotalAmountByInvoiceId(id: number) : Observable<number>{
    return this.http.get<number>(`${this.api + this.controllerInvoice}/GetTotalAmountByInvoiceId?invoiceId=${id}`);
  }

  ChangeStateByInvoiceId(id: number, nextState: number) : Observable<any> {
    return this.http.put(`${this.api + this.controllerInvoice}/ChangeStateByInvoiceId?invoiceId=${id}&nextState=${nextState}`, null)
  }  
}
