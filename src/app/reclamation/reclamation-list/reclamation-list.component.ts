import { Component, OnInit } from '@angular/core';
import { Reclamation, Statut } from '../../models/reclamation.model';
import { ReclamationService } from '../../services/reclamation.service';

@Component({
  selector: 'app-reclamation-list',
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.scss'],
})
export class ReclamationListComponent implements OnInit {
  reclamations: Reclamation[] = [];
  loading = false;
  error = '';

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.loading = true;
    this.reclamationService.getAllReclamations().subscribe({
      next: (data) => {
        this.reclamations = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des réclamations';
        console.error(err);
        this.loading = false;
      },
    });
  }

  changerStatut(id: number, action: string): void {
    this.reclamationService.changerStatutReclamation(id, action).subscribe({
      next: (updatedReclamation) => {
        // Mettre à jour la réclamation dans le tableau local
        const index = this.reclamations.findIndex(
          (r) => r.id === updatedReclamation.id
        );
        if (index !== -1) {
          this.reclamations[index] = updatedReclamation;
        }
      },
      error: (err) => {
        this.error = 'Erreur lors du changement de statut';
        console.error(err);
      },
    });
  }

  supprimerReclamation(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réclamation ?')) {
      this.reclamationService.supprimerReclamation(id).subscribe({
        next: () => {
          this.reclamations = this.reclamations.filter((r) => r.id !== id);
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression';
          console.error(err);
        },
      });
    }
  }

  getStatutClass(statut: Statut): string {
    if (statut === Statut.EN_ATTENTE) {
      return 'badge bg-warning';
    } else if (statut === Statut.TRAITEE) {
      return 'badge bg-success';
    } else if (statut === Statut.REFUSEE) {
      return 'badge bg-danger';
    } else {
      return 'badge bg-secondary';
    }
  }
}
