import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private apiUrl = 'http://localhost:8888/api/organization/all';

  constructor(private http: HttpClient) {}

  getOrganizations() {
    return this.http.get<string[]>(this.apiUrl);
  }
}
