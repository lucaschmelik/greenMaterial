import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginRequest } from './loginRequest';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { UserResponse } from './userResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private currentUser: BehaviorSubject<UserResponse> = new BehaviorSubject<UserResponse>({ id: 0 })
  private api = '';
  private controller = 'user';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.api = baseUrl }

  login(credentials: LoginRequest): Observable<UserResponse> {

    return this.http.get<UserResponse>(`${this.api + this.controller}/ByEmailPassword?email=${credentials.email}&password=${credentials.password}`)
    .pipe(
      tap(userData => {

        console.log('UserData login service:', userData);

        if(userData.id != 0){
          this.currentUser.next(userData);
          this.userLoginOn.next(true);
        }
      })
    );
  }

  register(newUser: any): Observable<any> {
    return this.http.post<any>(`${this.api + this.controller}`, newUser);
  }

  get userLogin():Observable<UserResponse>{
    return this.currentUser.asObservable()
  }

  get userIdLogin(){
    return this.currentUser.value.id
  }

  get isUserLoginOn():Observable<boolean>{
    return this.userLoginOn.asObservable()
  }

  get userIsLoginOn(): boolean{
    return Boolean(this.currentUser.value.id != 0)
  }

  cerrarSesion(){
    this.userLoginOn.next(false)
    this.currentUser.next({ id:0 })
  }
}
