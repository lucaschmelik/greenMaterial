import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest } from './loginRequest';
import { UserResponse } from './userResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserId: number;
  private userLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private api = '';
  private controller = 'user';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.api = baseUrl
    this.currentUserId = parseInt(localStorage.getItem("id") ?? "0", 10);
    this.userLoginOn.next(this.currentUserId != 0);
  }

  login(credentials: LoginRequest): Observable<UserResponse> {

    return this.http.get<UserResponse>(`${this.api + this.controller}/ByEmailPassword?email=${credentials.email}&password=${credentials.password}`)
    .pipe(
      tap(userData => {

        console.log('UserData login service:', userData);

        if (userData.id != 0) {
          this.currentUserId = userData.id;
          this.userLoginOn.next(true);
          localStorage.setItem("id", this.currentUserId.toString());
        }
      })
    );
  }

  register(newUser: any): Observable<any> {
    return this.http.post<any>(`${this.api + this.controller}`, newUser);
  }

  get userIdLogin(){
    return this.currentUserId
  }

  get isUserLoginOn(): Observable<boolean>{
    return this.userLoginOn.asObservable();
  }

  cerrarSesion() {
    this.userLoginOn.next(false);
    localStorage.setItem("id", "0");
  }
}
