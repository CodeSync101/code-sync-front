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
}
