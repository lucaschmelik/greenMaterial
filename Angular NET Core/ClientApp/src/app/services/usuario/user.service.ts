import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserResponse } from '../auth/userResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = '';
  private controller = 'user';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.api = baseUrl
  }

  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.api + this.controller}`);
  }
}
