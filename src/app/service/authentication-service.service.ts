import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Account } from '../model/account';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Client } from '../model/client';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  prefix = "/authentication"

  login(email: string, password: string): Observable<Client> {
    return this.http
      .post(`${environment.host}${this.prefix}/`, { email: email, password: password })
      .map(res => res.json())
  }

  forgotPassword(email: string): Observable<any> {
    return this.http
      .get(`${environment.host}${this.prefix}/forgotPassword?email=${email}`)
      .map(res => res.json())
  }

  register(account: Account): Observable<any> {
    return this.http
      .put(`${environment.host}${this.prefix}/`, { email: account.email, username: account.username, password: account.password })
      .map(res => res.json())
  }

  isAuthorized(client: Client): Observable<boolean> {
    return this.http
      .post(`${environment.host}${this.prefix}/isAuthorized`, client)
      .map(res => res.json());
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http
      .get(`${environment.host}${this.prefix}/account/all`)
      .map(res => res.json());
  }
}
