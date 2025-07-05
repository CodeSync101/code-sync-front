import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { ReclamationService } from '../../services/reclamation.service';
import { Reclamation, Statut } from '../../models/reclamation.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Matiere } from '../../models/matiere.model';
import { MatiereService } from '../../services/matiere.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  matieres: Matiere[] = [];
  loading = false;
  error = '';
  reclamationForm: FormGroup;
  selectedMatiere: Matiere | null = null;
  reclamationSuccess = false;

  // Pour simuler l'utilisateur connecté
  currentUserId = 2;

  constructor(
    private matiereService: MatiereService,
    private reclamationService: ReclamationService,
    private formBuilder: FormBuilder
  ) {
    this.reclamationForm = this.formBuilder.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.loadMatieres();
  }

  loadMatieres(): void {
    this.loading = true;
    // TEMP : utiliser l'API /all pour debug
    this.matiereService.getAllMatieres().subscribe({
      next: (data) => {
        this.matieres = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des matières';
        console.error('Erreur détaillée:', error);
        this.loading = false;
      },
    });
  }

  openReclamationModal(matiere: Matiere): void {
    this.selectedMatiere = matiere;
    this.reclamationForm.reset();

    // Préremplir le titre avec des informations pertinentes
    const titrePropose = `Réclamation pour la matière ${matiere.libelle}`;
    this.reclamationForm.patchValue({
      titre: titrePropose,
    });

    this.reclamationSuccess = false;
  }

  closeReclamationModal(): void {
    this.selectedMatiere = null;
  }

  // Getter pour accéder facilement aux champs du formulaire
  get f() {
    return this.reclamationForm.controls;
  }

  onSubmitReclamation(): void {
    if (this.reclamationForm.invalid || !this.selectedMatiere) {
      return;
    }

    const reclamation: Reclamation = {
      titre: this.f['titre'].value,
      description: this.f['description'].value,
      statut: Statut.EN_ATTENTE,
      dateCreation: new Date(),
    };

    // Utiliser l'ID de matière sélectionnée
    const matiereId = this.selectedMatiere.id || 1;

    this.reclamationService
      .ajouterReclamation(reclamation, this.currentUserId, matiereId)
      .subscribe({
        next: () => {
          this.reclamationSuccess = true;
          setTimeout(() => {
            this.closeReclamationModal();
          }, 2000);
        },
        error: (error) => {
          this.error = "Erreur lors de l'ajout de la réclamation";
          console.error(error);
        },
      });
  }
}
