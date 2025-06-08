import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private apiUrl = 'http://localhost:8888/api/organization/all';
  private currentOrganization = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  getOrganizations() {
    return this.http.get<string[]>(this.apiUrl);
  }

  setCurrentOrganization(org: string) {
    this.currentOrganization.next(org);
  }

  getCurrentOrganization(): Observable<string> {
    return this.currentOrganization.asObservable();
  }

  getCurrentOrganizationValue(): string {
    return this.currentOrganization.value;
  }
}
