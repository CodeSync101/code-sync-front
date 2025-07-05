import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contributor } from '../dashboard/dashboard-components/top-contributions/Contributor';
import { OrganizationService } from './organization.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private baseUrl = environment.apiUrl ;

  constructor(
    private http: HttpClient,
    private organizationService: OrganizationService
  ) { }
  getTotalCommits(organization?: string): Observable<any> {
    if (organization) {
      return this.http.get(`${this.baseUrl}/reporting/api/commit/total-count`, { params: { organization } });
    } else {
      return this.organizationService.getCurrentOrganization().pipe(
        switchMap(org => this.http.get(`${this.baseUrl}/reporting/api/commit/total-count`, { params: { organization: org } }))
      );
    }
  }

  getTotalBranches(): Observable<any> {
    return this.organizationService.getCurrentOrganization().pipe(
      switchMap(org => {
        return this.http.get(`${this.baseUrl}/reporting/api/branches/distinct-count?organization=${org}`);
      })
    );
  }

  getActiveCollaboratorsCount(organization?: string): Observable<any> {
    if (organization) {
      return this.http.get(`${this.baseUrl}/reporting/api/commit/distinct-authors`, {
        params: { organization }
      });
    } else {
      return this.organizationService.getCurrentOrganization().pipe(
        switchMap(org =>
          this.http.get(`${this.baseUrl}/reporting/api/commit/distinct-authors`, {
            params: { organization: org }
          })
        )
      );
    }
  }

  getDistinctRepositories(organization?: string): Observable<any> {
    if (organization) {
      return this.http.get(`${this.baseUrl}/reporting/api/commit/distinct-repositories`, {
        params: { organization }
      });
    } else {
      return this.organizationService.getCurrentOrganization().pipe(
        switchMap(org =>
          this.http.get(`${this.baseUrl}/reporting/api/commit/distinct-repositories`, {
            params: { organization: org }
          })
        )
      );
    }
  }
getLatestCommits(organization: string) {
  return this.http.get(`${this.baseUrl}/reporting/api/reporting/get-latest-commits`, {
    params: { organization }
  });
}

getLatestPulls(): Observable<any> {
  return this.http.get(`${this.baseUrl}/reporting/api/reporting/get-latest-pulls`);
}

getLatestPushes(organization:string) {
  return this.http.get(`${this.baseUrl}/reporting/api/reporting/get-latest-pushs`, {
    params: { organization }
  });
}


getTopContributors(): Observable<{totalContributions: number, topContributors: Contributor[]}> {
  return this.organizationService.getCurrentOrganization().pipe(
    switchMap(org => {
      return this.http.get<{totalContributions: number, topContributors: Contributor[]}>(
        `${this.baseUrl}/reporting/api/reporting/contribution-summary`, {
          params: { organization: org }
        }
      );
    })
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
