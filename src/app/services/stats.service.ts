import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private baseUrl = 'http://localhost:8888/api'; 

  constructor(private http: HttpClient) { }

  getTotalCommits(): Observable<any> {
    return this.http.get(`${this.baseUrl}/commit/total-count`);
  }

  getTotalBranches(): Observable<any> {
    return this.http.get(`${this.baseUrl}/branches/distinct-count`);
  }
}
