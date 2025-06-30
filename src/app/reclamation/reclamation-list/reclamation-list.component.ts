import { Component, OnInit } from '@angular/core';
import { Reclamation, Statut } from '../../models/reclamation.model';
import { ReclamationService } from '../../services/reclamation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reclamation-list',
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.scss'],
})
export class ReclamationListComponent implements OnInit {
  reclamations: Reclamation[] = [];
  loading = false;
  error = '';
  selectedReclamation: Reclamation | null = null;
  traiterForm: FormGroup;
  traiterSuccess = false;

  // Pour simuler un enseignant connecté (à remplacer par votre logique d'authentification)
  isTeacher = true;

  constructor(
    private reclamationService: ReclamationService,
    private formBuilder: FormBuilder
  ) {
    this.traiterForm = this.formBuilder.group({
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

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

  openTraiterModal(reclamation: Reclamation): void {
    this.selectedReclamation = reclamation;
    this.traiterForm.reset();
    this.traiterSuccess = false;
  }

  closeTraiterModal(): void {
    this.selectedReclamation = null;
  }

  // Getter pour accéder facilement aux champs du formulaire
  get f() {
    return this.traiterForm.controls;
  }

  traiterReclamation(): void {
    if (this.traiterForm.invalid || !this.selectedReclamation) {
      return;
    }

    const message = this.f['message'].value;

    this.reclamationService
      .traiterReclamation(this.selectedReclamation.id!, message)
      .subscribe({
        next: (updatedReclamation) => {
          // Mettre à jour la réclamation dans le tableau local
          const index = this.reclamations.findIndex(
            (r) => r.id === updatedReclamation.id
          );
          if (index !== -1) {
            this.reclamations[index] = updatedReclamation;
          }

          this.traiterSuccess = true;
          setTimeout(() => {
            this.closeTraiterModal();
          }, 2000);
        },
        error: (err) => {
          this.error = 'Erreur lors du traitement de la réclamation';
          console.error(err);
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
    } else if (statut === Statut.REJETEE) {
      return 'badge bg-danger';
    } else if (statut === Statut.EN_COURS) {
      return 'badge bg-info';
    } else {
      return 'badge bg-secondary';
    }
  }
}
