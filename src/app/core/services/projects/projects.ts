import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Project } from '../../../shared/interface/project/project';

@Service()
export class Projects {
  httpClient = inject(HttpClient);

  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${environment.apiUrl}projects`);
  }
  newProject(data: object): Observable<Project> {
    return this.httpClient.post<Project>(`${environment.apiUrl}projects`, data);
  }
  getProjectById(id: string): Observable<Project> {
    return this.httpClient.get<Project>(`${environment.apiUrl}projects/${id}`);
  }
  putProjectBYId(id: string, data: object): Observable<Project> {
    return this.httpClient.put<Project>(`${environment.apiUrl}projects/${id}`, data);
  }
  deleteProjectById(id: string): Observable<Project> {
    return this.httpClient.delete<Project>(`${environment.apiUrl}projects/${id}`);
  }
}
