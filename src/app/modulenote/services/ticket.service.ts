import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../models/ticket.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://localhost:8084/projetMission/api/notes';

  constructor(private http: HttpClient) {}

  getTicketsByTache(tacheId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/getNotestickets/${tacheId}`);
  }

  addNote(tacheId: number, ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.baseUrl}/addNoteticket/${tacheId}`, ticket);
  }

  updateNote(tacheId: number, ticketId: number, ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.baseUrl}/updateNoteticket/${tacheId}/${ticketId}`, ticket);
  }

  deleteNote(ticketId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteNoteticket/${ticketId}`);
  }
}
