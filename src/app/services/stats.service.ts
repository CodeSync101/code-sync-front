import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  // New method to get the distinct repositories
  getDistinctRepositories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/commit/distinct-repositories`);
  }
}
