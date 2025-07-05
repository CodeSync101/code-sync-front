import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matiere } from '../models/matiere.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatiereService {
  private baseUrl = environment.apiUrl ;

  constructor(private http: HttpClient) {}

  getMatieresByEtudiant(userId: number): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`${this.baseUrl}/etudiant/${userId}`);
  }

  getAllMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`${this.baseUrl}/all`);
  }

  //private apiUrl = 'http://localhost:8080/projetMission/matiere';

  getAllMatieresF(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/matiere/getAll`);
  }

  createMatiere(matiere: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/matiere/create`, matiere);
  }

  updateMatiere(id: number, matiere: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/matiere/update/${id}`, matiere);
  }

  deleteMatiere(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/matiere/delete/${id}`);
  }
}

