import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
    private baseUrl = environment.apiUrl ;

  private apiUrl = `${this.baseUrl}/reporting/api/organization/all` ;
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
