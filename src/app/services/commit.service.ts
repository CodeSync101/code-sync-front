import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommitService {
 private baseUrl = environment.apiUrl ;

  constructor(private http: HttpClient) {}
  
  getCommits(startDate: string, endDate: string, author: string): Observable<{[date: string]: number}> {
    const url = `${this.baseUrl}/commit/commits-by-collaborator?startDate=${startDate}&endDate=${endDate}&author=${author}`;
    return this.http.get<{[date: string]: number}>(url).pipe(
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