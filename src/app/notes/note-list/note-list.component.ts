import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { ReclamationService } from '../../services/reclamation.service';
import { Reclamation, Statut } from '../../models/reclamation.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  loading = false;
  error = '';
  reclamationForm: FormGroup;
  selectedNote: Note | null = null;
  reclamationSuccess = false;

  // Pour simuler l'utilisateur connecté
  currentUserId = 2;

  constructor(
    private noteService: NoteService,
    private reclamationService: ReclamationService,
    private formBuilder: FormBuilder
  ) {
    this.reclamationForm = this.formBuilder.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.loading = true;
    this.noteService.getNotesByUser(this.currentUserId).subscribe({
      next: (data) => {
        console.log("Notes reçues de l'API:", data);
        this.notes = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des notes';
        console.error('Erreur détaillée:', error);
        this.loading = false;
      },
    });
  }

  openReclamationModal(note: Note): void {
    this.selectedNote = note;
    this.reclamationForm.reset();

    // Préremplir le titre avec des informations pertinentes
    const titrePropose = `Réclamation pour la note de ${
      note.tacheNom || "l'évaluation"
    }`;
    this.reclamationForm.patchValue({
      titre: titrePropose,
    });

    this.reclamationSuccess = false;
  }

  closeReclamationModal(): void {
    this.selectedNote = null;
  }

  // Getter pour accéder facilement aux champs du formulaire
  get f() {
    return this.reclamationForm.controls;
  }

  onSubmitReclamation(): void {
    if (this.reclamationForm.invalid || !this.selectedNote) {
      return;
    }

    const reclamation: Reclamation = {
      titre: this.f['titre'].value,
      description: this.f['description'].value,
      statut: Statut.EN_ATTENTE,
      dateCreation: new Date(),
    };

    // Utiliser l'ID de matière de la note sélectionnée
    const matiereId = this.selectedNote.matiereId || 1;

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
