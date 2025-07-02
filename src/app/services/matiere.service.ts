import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matiere } from '../models/matiere.model';

@Injectable({
  providedIn: 'root',
})
export class MatiereService {
  private apiUrl = 'http://localhost:8090/api/matieres';

  constructor(private http: HttpClient) {}

  getMatieresByEtudiant(userId: number): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`${this.apiUrl}/etudiant/${userId}`);
  }

  getAllMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`${this.apiUrl}/all`);
  }


  //private apiUrl = 'http://localhost:8080/projetMission/matiere';

  getAllMatieresF(): Observable<any[]> {
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


