import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RapportService {
  private baseUrl = 'http://localhost:8083/api/rapport';

  constructor(private http: HttpClient) {}

  getEtudiants() {
    return this.http.get<string[]>(`${this.baseUrl}/etudiants`);
  }

  downloadRapport(startDate: string, endDate: string, selectedStudents: string[], selectedSections: string[]) {
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    selectedStudents.forEach(s => params = params.append('selectedStudents', s));
    selectedSections.forEach(s => params = params.append('selectedSections', s));

    return this.http.get(`${this.baseUrl}/generate`, {
      params,
      responseType: 'blob'
    });
  }
}
