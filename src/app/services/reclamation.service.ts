import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/reclamation.model';

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8090/api/reclamations';

  constructor(private http: HttpClient) {}

  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.apiUrl}/all`);
  }

  ajouterReclamation(
    reclamation: Reclamation,
    userId: number,
    matiereId: number = 1
  ): Observable<Reclamation> {
    return this.http.post<Reclamation>(
      `${this.apiUrl}/add/${userId}/${matiereId}`,
      reclamation
    );
  }

  modifierReclamation(
    id: number,
    reclamation: Reclamation
  ): Observable<Reclamation> {
    return this.http.put<Reclamation>(
      `${this.apiUrl}/update/${id}`,
      reclamation
    );
  }

  supprimerReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  changerStatutReclamation(
    id: number,
    action: string
  ): Observable<Reclamation> {
    return this.http.put<Reclamation>(
      `${this.apiUrl}/statut/${id}/${action}`,
      {}
    );
  }

  traiterReclamation(id: number, message: string): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.apiUrl}/traiter/${id}`, {
      message,
    });
  }

  ajouterReclamationSimple(
    reclamation: Reclamation,
    userId: number
  ): Observable<Reclamation> {
    return this.http.post<Reclamation>(
      `${this.apiUrl}/add-simple/${userId}`,
      reclamation
    );
  }
}
