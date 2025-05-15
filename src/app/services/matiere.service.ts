import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  private apiUrl = 'http://localhost:8084/projetMission/matiere';

  constructor(private http: HttpClient) { }

  getAllMatieres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }

  createMatiere(matiere: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, matiere);
  }

  updateMatiere(id: number, matiere: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, matiere);
  }

  deleteMatiere(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
