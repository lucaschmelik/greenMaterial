import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { ResumeData } from './resumeData';
import { Observable } from 'rxjs/internal/Observable';
import { Payment } from 'src/app/shared/models/payment';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private http: HttpClient, private loginService: LoginService, @Inject('BASE_URL') baseUrl: string) { this.api = baseUrl }

  private api = '';
  private apiPayment = 'payment';

  getResumeByUserId(): Observable<ResumeData> {
    return this.http.get<ResumeData>(`${this.api + this.apiPayment}?userId=${this.loginService.userIdLogin}`)
  }

  postPayment(payment: Payment) : Observable<Payment> {
    return this.http.post<Payment>(`${this.api + this.apiPayment}?userId=${this.loginService.userIdLogin}`, payment)
  }
  
}
