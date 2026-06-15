import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getTasks(): Observable<{ tasks: Task[] }> {
    return this.http.get<{ tasks: Task[] }>(`${this.apiUrl}/tasks`);
  }

  createTask(task: Partial<Task>): Observable<{ task: Task }> {
    return this.http.post<{ task: Task }>(`${this.apiUrl}/tasks`, task);
  }

  updateTask(id: string, task: Partial<Task>): Observable<{ task: Task }> {
    return this.http.put<{ task: Task }>(`${this.apiUrl}/tasks/${id}`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }
}