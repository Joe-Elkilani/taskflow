import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Itask } from '../../../shared/interface/tasks/itask';

export interface TaskPayload {
  taskName: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  projectId: number;
  assignedToUserId: number;
}

@Service()
export class Tasks {
  httpClient = inject(HttpClient);

  getAllTasks(): Observable<Itask[]> {
    return this.httpClient.get<Itask[]>(`${environment.apiUrl}tasks`);
  }
  newTask(data: TaskPayload): Observable<Itask> {
    return this.httpClient.post<Itask>(`${environment.apiUrl}tasks`, data);
  }
  getTaskById(id: string): Observable<Itask> {
    return this.httpClient.get<Itask>(`${environment.apiUrl}tasks/${id}`);
  }
  putTaskBYId(id: string, data: TaskPayload): Observable<Itask> {
    return this.httpClient.put<Itask>(`${environment.apiUrl}tasks/${id}`, data);
  }
  deleteTaskById(id: string) {
    return this.httpClient.delete(`${environment.apiUrl}tasks/${id}`);
  }
}
