import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupRepoDTO, GroupRepoRequest } from '../models/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private apiUrl = 'http://localhost:8083/api/v1/group';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // Adjust based on your Keycloak setup
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getRepositoryGroups(): Observable<GroupRepoDTO[]> {
    return this.http.get<GroupRepoDTO[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  createRepositoryGroup(request: GroupRepoRequest): Observable<GroupRepoDTO> {
    return this.http.post<GroupRepoDTO>(`${this.apiUrl}/create-group`, request, { headers: this.getHeaders() });
  }

  updateRepositoryGroup(id: number, request: GroupRepoRequest): Observable<GroupRepoDTO> {
    return this.http.put<GroupRepoDTO>(`${this.apiUrl}/${id}`, request, { headers: this.getHeaders() });
  }

  deleteRepositoryGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}