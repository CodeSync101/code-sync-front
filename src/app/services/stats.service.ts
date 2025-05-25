import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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


}
