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
  
  getCommits(startDate: string, endDate: string, author: string, organization?: string): Observable<{[date: string]: number}> {
    let url = `${this.baseUrl}/reporting/api/commit/commits-by-collaborator?startDate=${startDate}&endDate=${endDate}&author=${author}&organization=${organization}`;

    return this.http.get<{[date: string]: number}>(url);
  }
}

