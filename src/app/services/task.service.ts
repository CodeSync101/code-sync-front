import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  //private baseUrl = 'http://localhost:8080/api/tasks';
 private baseUrl = 'http://localhost:8082/task/api/api/tasks';
  constructor(private http: HttpClient) {}

  getTasksByRepo(repoName: string) {
    return this.http.get<Task[]>(`${this.baseUrl}/repo/${repoName}`);
  }
   createTask(task: any): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }


updateTask(id: number, task: Task): Observable<Task> {
  return this.http.put<Task>(`${this.baseUrl}/${id}`, task);
}

deleteTask(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
}


}
