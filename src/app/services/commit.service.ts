import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommitService {
 private baseUrl = environment.apiUrl ;

  constructor(private http: HttpClient) {}
  
  getCommits(startDate: string, endDate: string, author: string, organization?: string): Observable<{[date: string]: number}> {
    let url = `${this.baseUrl}/commit/commits-by-collaborator?startDate=${startDate}&endDate=${endDate}&author=${author}&organization=${organization}`;

    return this.http.get<{[date: string]: number}>(url);
  }
}