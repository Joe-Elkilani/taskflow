import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Register } from '../../../shared/interface/register';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/interface/login/login';
import { Router } from '@angular/router';

@Service()
export class Auth {
  httpClient = inject(HttpClient);
  router = inject(Router);
  private readonly _currentUser = signal<User | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this._currentUser() !== null);
  userdata: any;
  register(data: object): Observable<Register> {
    return this.httpClient.post<Register>(`${environment.apiUrl}auth/register`, data);
  }
  login(data: object): Observable<User> {
    return this.httpClient
      .post<User>(`${environment.apiUrl}auth/login`, data, { withCredentials: true })
      .pipe(tap((user) => this._currentUser.set(user)));
  }

  logout(): void {
    this.httpClient
      .post(`${environment.apiUrl}auth/logout`, {}, { withCredentials: true })
      .subscribe({
        next: () => this.finishLogout(),
        error: () => this.finishLogout(),
      });
  }
  fetchCurrentUser(): Observable<User> {
    return this.httpClient
      .get<User>(`${environment.apiUrl}auth/me`, { withCredentials: true })
      .pipe(tap((user) => this._currentUser.set(user)));
  }
  handleUnauthorized(): void {
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }

  private finishLogout(): void {
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
