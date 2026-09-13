import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
export interface IUserOption {
  id: number;
  fullName: string;
}

@Service()
export class Users {
  httpClient = inject(HttpClient);

  getAllUsers(): Observable<IUserOption[]> {
    return this.httpClient.get<IUserOption[]>(`${environment.apiUrl}users`);
  }
}
