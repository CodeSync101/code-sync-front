// tickets.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from '../services/tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  matieres: any[] = [];
  filteredTickets: any[] = [];
  ticketForm: FormGroup;
  formType = 'Ajouter Ticket';
  id: string = '';
  currentTicketId: number | null = null;
  searchText = '';

  constructor(
    private fb: FormBuilder,
    private ticketsService: TicketsService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.ticketForm = this.fb.group({
      noteticket: [0],
      titre: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getAllTickets();
  }

  getAllTickets() {
    this.ticketsService.getTicketsByTache(parseInt(this.id)).subscribe((data: any[]) => {
      this.matieres = data;
      this.filteredTickets = data;
    });
  }

  filterTickets(event: Event) {
    const search = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredTickets = this.matieres.filter((m) =>
      m.titre.toLowerCase().includes(search)
    );
  }

  openAddForm() {
    this.formType = 'Ajouter Ticket';
    this.ticketForm.reset();
    this.currentTicketId = null;
  }

  populateForm(ticket: any) {
    this.formType = 'Modifier Ticket';
    this.currentTicketId = ticket.id;
    this.ticketForm.patchValue({
      titre: ticket.titre,
      noteticket: ticket.noteticket
    });
  }

  handleTicket() {
    const ticketData = this.ticketForm.value;
    const tacheId = parseInt(this.id);

    if (this.currentTicketId) {
      // modification
      this.ticketsService.updateTicket(tacheId, this.currentTicketId, ticketData).subscribe(() => {
        this.toastr.success('Ticket modifié avec succès');
        this.getAllTickets();
      });
    } else {
      // ajout
      this.ticketsService.addTicket(tacheId, ticketData).subscribe(() => {
        this.toastr.success('Ticket ajouté avec succès');
        this.getAllTickets();
      });
    }

    document.querySelector<HTMLButtonElement>('.btn-close')?.click();
  }

  async deleteTicket(id: number): Promise<void> {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticketsService.deleteTicket(id).subscribe(
          () => {
            this.getAllTickets();
            this.toastr.success('Ticket supprimé avec succès', 'Succès');
          },
          () => {
            this.toastr.error('Erreur lors de la suppression', 'Erreur');
          }
        );
      }
    });
  }
}
