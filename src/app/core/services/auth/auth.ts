import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../../../shared/interface/register';
import { environment } from '../../../../environments/environment';
import { Login } from '../../../shared/interface/login/login';

@Service()
export class Auth {
  httpClient = inject(HttpClient);
  register(data: object): Observable<Register> {
    return this.httpClient.post<Register>(`${environment.apiUrl}auth/register`, data);
  }
  login(data: object): Observable<Login> {
    return this.httpClient.post<Login>(`${environment.apiUrl}auth/login`, data);
  }
}
