import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  tickets: Ticket[] = [];
  newTicket: Ticket = { description: '', note: 0 };  // Assure-toi que 'Ticket' est bien typé.
  selectedTicketId: number | null = null;

  tacheId: number = 1; // Remplace par l'ID réel de la tâche à utiliser

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets() {
    this.ticketService.getTicketsByTache(this.tacheId).subscribe(data => {
      this.tickets = data;
    });
  }

  addOrUpdateTicket() {
    if (this.selectedTicketId) {
      // Met à jour un ticket existant
      this.ticketService.updateNote(this.tacheId, this.selectedTicketId, this.newTicket)
        .subscribe(() => {
          this.getTickets();
          this.resetForm();
        });
    } else {
      // Ajoute un nouveau ticket
      this.ticketService.addNote(this.tacheId, this.newTicket)
        .subscribe(() => {
          this.getTickets();
          this.resetForm();
        });
    }
  }

  editTicket(ticket: Ticket) {
    this.newTicket = { ...ticket };
    this.selectedTicketId = ticket.id || null;
  }

  deleteTicket(id: number) {
    this.ticketService.deleteNote(id).subscribe(() => this.getTickets());
  }

  resetForm() {
    this.newTicket = { description: '', note: 0 };
    this.selectedTicketId = null;
  }
}
