import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = 'http://localhost:8090/api/notes';

  constructor(private http: HttpClient) {}

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}`);
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  getNotesByUser(userId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/user/${userId}`);
  }

  getNotesByTache(tacheId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/tache/${tacheId}`);
  }

  getNotesByUserAndTache(userId: number, tacheId: number): Observable<Note[]> {
    return this.http.get<Note[]>(
      `${this.apiUrl}/user/${userId}/tache/${tacheId}`
    );
  }

  ajouterNote(note: Note, userId: number, tacheId: number): Observable<Note> {
    return this.http.post<Note>(
      `${this.apiUrl}/add/${userId}/${tacheId}`,
      note
    );
  }

  modifierNote(id: number, note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, note);
  }

  supprimerNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
