import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Organization, OrganizationRequest } from '../models/organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private apiUrl = 'http://localhost:8083/api/v1/organization';

  constructor(private http: HttpClient) { }

  createOrganization(request: OrganizationRequest): Observable<Organization> {
    return this.http.post<Organization>(`${this.apiUrl}/create`, request).pipe(
      catchError(this.handleError)
    );
  }

  getAllOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getOrganizationById(id: number): Observable<Organization> {
    return this.http.get<Organization>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateOrganization(id: number, request: OrganizationRequest): Observable<Organization> {
    return this.http.put<Organization>(`${this.apiUrl}/${id}`, request).pipe(
      catchError(this.handleError)
    );
  }

  deleteOrganization(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  assignToClassRoom(orgId: number, classRoomId: number): Observable<Organization> {
    return this.http.put<Organization>(`${this.apiUrl}/${orgId}/classroom/${classRoomId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}