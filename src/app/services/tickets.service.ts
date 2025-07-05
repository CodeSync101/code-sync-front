// tickets.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private baseUrl = environment.apiUrl ;
  //private baseUrl = 'http://localhost:8084/projetMission/Ticket';

  constructor(private http: HttpClient) {}

  addTicket(tacheId: number, ticket: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Ticket/addticket/${tacheId}`, ticket);
  }

  updateTicket(tacheId: number, ticketId: number, ticket: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Ticket/updateticket/${tacheId}/${ticketId}`, ticket);
  }

  deleteTicket(ticketId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Ticket/deleteticket/${ticketId}`);
  }

  getTicketsByTache(tacheId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Ticket/getTickets/${tacheId}`);
  }
}