import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface Branch {
  id: number;
  name: string;
  isProtected: boolean;
  repositoryName: string;
  organization?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = 'http://localhost:8080/api/branches';

  constructor(private http: HttpClient) {}

  getBranches(repoName: string): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.apiUrl}/${repoName}`);
  }
}