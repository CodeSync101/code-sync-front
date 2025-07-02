// tickets.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private baseUrl = 'http://localhost:8084/projetMission/Ticket';

  constructor(private http: HttpClient) {}

  addTicket(tacheId: number, ticket: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addticket/${tacheId}`, ticket);
  }

  updateTicket(tacheId: number, ticketId: number, ticket: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateticket/${tacheId}/${ticketId}`, ticket);
  }

  deleteTicket(ticketId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteticket/${ticketId}`);
  }

  getTicketsByTache(tacheId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getTickets/${tacheId}`);
  }
}
