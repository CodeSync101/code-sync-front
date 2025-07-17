import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Organization, OrganizationRequest } from '../models/organization';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  private baseUrl = environment.apiUrl;

  private reportingApiUrl = `http://localhost:8083/api/v1/organization/list-orgs`;
  private currentOrganization = new BehaviorSubject<string>('');

  getOrganizations(): Observable<string[]> {
    return this.http.get<string[]>(this.reportingApiUrl).pipe(
      catchError(this.handleError)
    );
  }

  setCurrentOrganization(org: string): void {
    this.currentOrganization.next(org);
  }

  getCurrentOrganization(): Observable<string> {
    return this.currentOrganization.asObservable();
  }

  getCurrentOrganizationValue(): string {
    return this.currentOrganization.value;
  }
}
