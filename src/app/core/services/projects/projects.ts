import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Service()
export class Projects {
  httpClient = inject(HttpClient);

  getAllProjects(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}projects`);
  }
  newProject(data: object): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}projects`, data);
  }
}
