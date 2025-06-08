import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contributor } from '../dashboard/dashboard-components/top-selling/Contributor';
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
      return this.http.get(`${this.baseUrl}/commit/total-count`, { params: { organization } });
    } else {
      return this.organizationService.getCurrentOrganization().pipe(
        switchMap(org => this.http.get(`${this.baseUrl}/commit/total-count`, { params: { organization: org } }))
      );
    }
  }

  getTotalBranches(): Observable<any> {
    return this.organizationService.getCurrentOrganization().pipe(
      switchMap(org => {
        return this.http.get(`${this.baseUrl}/branches/distinct-count?organization=${org}`);
      })
    );
  }

  getActiveCollaboratorsCount(organization?: string): Observable<any> {
    if (organization) {
      return this.http.get(`${this.baseUrl}/commit/distinct-authors`, {
        params: { organization }
      });
    } else {
      return this.organizationService.getCurrentOrganization().pipe(
        switchMap(org =>
          this.http.get(`${this.baseUrl}/commit/distinct-authors`, {
            params: { organization: org }
          })
        )
      );
    }
  }

  getDistinctRepositories(organization?: string): Observable<any> {
    if (organization) {
      return this.http.get(`${this.baseUrl}/commit/distinct-repositories`, {
        params: { organization }
      });
    } else {
      return this.organizationService.getCurrentOrganization().pipe(
        switchMap(org =>
          this.http.get(`${this.baseUrl}/commit/distinct-repositories`, {
            params: { organization: org }
          })
        )
      );
    }
  }
getLatestCommits(organization: string) {
  return this.http.get(`${this.baseUrl}/reporting/get-latest-commits`, {
    params: { organization }
  });
}

getLatestPulls(): Observable<any> {
  return this.http.get(`${this.baseUrl}/reporting/get-latest-pulls`);
}

getLatestPushes(organization:string) {
  return this.http.get(`${this.baseUrl}/reporting/get-latest-pushs`, {
    params: { organization }
  });
}


getTopContributors(): Observable<{totalContributions: number, topContributors: Contributor[]}> {
  return this.organizationService.getCurrentOrganization().pipe(
    switchMap(org => {
      return this.http.get<{totalContributions: number, topContributors: Contributor[]}>(
        `${this.baseUrl}/reporting/contribution-summary`, {
          params: { organization: org }
        }
      );
    })
  );
}



}
