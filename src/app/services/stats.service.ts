import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contributor } from '../dashboard/dashboard-components/top-selling/Contributor';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private baseUrl = environment.apiUrl ;

  constructor(private http: HttpClient) { }

  getTotalCommits(): Observable<any> {
    return this.http.get(`${this.baseUrl}/commit/total-count`);
  }

  getTotalBranches(): Observable<any> {
    return this.http.get(`${this.baseUrl}/branches/distinct-count`);
  }

  getActiveCollaboratorsCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/commit/distinct-authors`); 
  }

  getDistinctRepositories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/commit/distinct-repositories`);
  }

  getLatestCommits(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporting/get-latest-commits`);
  }

  getLatestPulls(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporting/get-latest-pulls`);
  }

  getLatestPushes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporting/get-latest-pushs`);
  }

  getTopContributors(): Observable<{totalContributions: number, topContributors: Contributor[]}> {
    return this.http.get<{totalContributions: number, topContributors: Contributor[]}>(
      `${this.baseUrl}/reporting/contribution-summary`
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
