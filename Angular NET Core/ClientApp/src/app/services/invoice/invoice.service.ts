import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { LoginService } from '../auth/login.service';
import { CarritoService } from '../carrito/carrito.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient, private loginService: LoginService, private carritoService: CarritoService, @Inject('BASE_URL') baseUrl: string) { this.api = baseUrl }
  
  private api = '';
  private controllerInvoice = 'invoice';

  crearInvoice(): Observable<any> {
    if (!this.loginService.userIsLoginOn) {
      return throwError( () => 'Tiene que estar logeado');
    }
    return this.http.post(`${this.api + this.controllerInvoice}?userId=${this.loginService.userIdLogin}`, null);
  }  

  AgregarItemInvoice(invoiceId: number, productId: number, cantidad: number): Observable<any> {
    if (!this.loginService.userIsLoginOn) {
      return throwError( () => 'Tiene que estar logeado');
    }

    if (this.carritoService.hasCurrentInvoice) {
      return throwError(() => 'Ingrese al carrito, tiene un pedido en curso');
    }

    console.log(invoiceId, productId, cantidad)

    return this.http.post(`${this.api + this.controllerInvoice}/AddItem?invoiceId=${invoiceId}&productId=${productId}&cantidad=${cantidad}`, null);
  } 
}
