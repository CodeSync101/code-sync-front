import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    return this.http.get<GroupRepoDTO[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  createRepositoryGroup(request: GroupRepoRequest): Observable<GroupRepoDTO> {
    return this.http.post<GroupRepoDTO>(`${this.apiUrl}/create-group`, request, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateRepositoryGroup(id: number, request: GroupRepoRequest): Observable<GroupRepoDTO> {
    return this.http.put<GroupRepoDTO>(`${this.apiUrl}/${id}`, request, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deleteRepositoryGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred. Please try again later.';
    if (error.error instanceof ErrorEvent) {
      // Client-side/network error
      errorMessage = 'A network error occurred. Please check your internet connection.';
    } else {
      // Server-side error
      switch (error.status) {
        case 0:
          errorMessage = 'Cannot connect to the server. Please check your internet connection or try again later.';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        case 401:
        case 403:
          errorMessage = 'You are not authorized to perform this action.';
          break;
        default:
          if (error.status >= 500) {
            errorMessage = 'A server error occurred. Please try again later.';
          } else if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}