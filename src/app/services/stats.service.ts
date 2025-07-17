import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
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

  getLatestPulls(org: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reporting/api/reporting/get-latest-pulls`, {
      params: { organization: org }
    });
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

  getCommitFrequencyByWeekday(organization?: string): Observable<Record<string, number>> {
    if (organization) {
      return this.http.get<Record<string, number>>(
        `${this.baseUrl}/reporting/api/reporting/day-of-week`, { params: { organization } });
    } else {
      return this.organizationService.getCurrentOrganization().pipe(
        switchMap(org => this.http.get<Record<string, number>>(
          `${this.baseUrl}/reporting/api/reporting/day-of-week`, { params: { organization: org } })
        )
      );
    }
  }

  getTopRepositoriesByCommitCount(organization?: string, limit = 5): Observable<Record<string, number>> {
    if (organization) {
      return this.http.get<Record<string, number>>(
        `${this.baseUrl}/reporting/api/reporting/top-repositories`, { params: { organization, limit: limit.toString() } });
    } else {
      return this.organizationService.getCurrentOrganization().pipe(
        switchMap(org => this.http.get<Record<string, number>>(
          `${this.baseUrl}/reporting/api/reporting/top-repositories`, { params: { organization: org, limit: limit.toString() } })
        )
      );
    }
  }
  
  fetchBranches(organization: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reporting/api/branches/fetch/${organization}`, null);
  }
  
} 