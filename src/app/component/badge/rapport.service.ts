import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RapportService {
  private baseUrl = environment.apiUrl ;

  constructor(private http: HttpClient) {}

  getEtudiants() {
    return this.http.get<string[]>(`${this.baseUrl}/reporting/api/api/rapport/etudiants`);
  }

  downloadRapport(startDate: string, endDate: string, selectedStudents: string[], selectedSections: string[]) {
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    selectedStudents.forEach(s => params = params.append('selectedStudents', s));
    selectedSections.forEach(s => params = params.append('selectedSections', s));

    return this.http.get(`${this.baseUrl}/reporting/api/api/rapport/generate`, {
      params,
      responseType: 'blob'
    });
  }
}
