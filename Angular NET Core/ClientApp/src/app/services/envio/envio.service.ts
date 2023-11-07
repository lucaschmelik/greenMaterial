import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from '../auth/login.service';
import { Delivery } from './delivery';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {

  private api = '';
  private controllerInvoice = 'invoice';
  private controllerDelivery = 'delivery';

  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  SetData(data: any) {
    this.dataSubject.next(data);
  }

  constructor(private http: HttpClient, private loginService: LoginService, @Inject('BASE_URL') baseUrl: string) { this.api = baseUrl }
  
  GetTotalAmountByStateAndUser() : Observable<number>{
    return this.http.get<number>(`${this.api + this.controllerInvoice}/GetTotalAmountByUserId?userId=${this.loginService.userIdLogin}`);
  }

  SaveDeliveryType(delivery: Delivery) : Observable<number>{
    return this.http.post<number>(`${this.controllerDelivery}?userId=${this.loginService.userIdLogin}`, delivery);
  }

  set idInvoice(id: number){
    this.idInvoice = id;
  }
}
