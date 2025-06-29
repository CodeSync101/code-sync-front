// organization.service.ts (Corrected Version)

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// --- CHANGE 1: Import the environment file ---
import { environment } from '../../environements/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  // --- CHANGE 2: Use the 'apiUrl' from the environment file ---
  private baseUrl = environment.apiUrl;

  private currentOrganization = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  getOrganizations(): Observable<string[]> {
    // --- CHANGE 3: Build the URL correctly so it uses the proxy ---
    const url = `${this.baseUrl}/organization/all`;
    return this.http.get<string[]>(url);
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
