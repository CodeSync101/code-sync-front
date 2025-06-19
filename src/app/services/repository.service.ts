import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private baseUrl = 'http://localhost:8080/api/repositories';

  constructor(private http: HttpClient) {}

  getAllRepositories() {
    return this.http.get<string[]>(this.baseUrl);
  }
}