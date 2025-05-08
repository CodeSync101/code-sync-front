import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Reclamation, Priorite, Statut } from '../../models/reclamation.model';
import { ReclamationService } from '../../services/reclamation.service';

@Component({
  selector: 'app-reclamation-add',
  templateUrl: './reclamation-add.component.html',
  styleUrls: ['./reclamation-add.component.scss'],
})
export class ReclamationAddComponent implements OnInit {
  reclamationForm: FormGroup;
  loading = false;
  error = '';
  submitted = false;
  priorites = Object.values(Priorite);

  constructor(
    private formBuilder: FormBuilder,
    private reclamationService: ReclamationService,
    private router: Router
  ) {
    this.reclamationForm = this.formBuilder.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priorite: [Priorite.MOYENNE, Validators.required],
    });
  }

  ngOnInit(): void {}

  // Getter pour accéder facilement aux champs du formulaire
  get f() {
    return this.reclamationForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Si le formulaire est invalide, on arrête ici
    if (this.reclamationForm.invalid) {
      return;
    }

    this.loading = true;

    // Création de l'objet réclamation
    const reclamation: Reclamation = {
      titre: this.f['titre'].value,
      description: this.f['description'].value,
      priorite: this.f['priorite'].value,
      statut: Statut.EN_ATTENTE,
      dateCreation: new Date(),
    };

    // Pour l'exemple, on utilise l'ID utilisateur 1
    // Dans une application réelle, vous récupéreriez l'ID de l'utilisateur connecté
    const userId = 1;

    this.reclamationService.ajouterReclamation(reclamation, userId).subscribe({
      next: () => {
        this.router.navigate(['/reclamations']);
      },
      error: (error) => {
        this.error = "Erreur lors de l'ajout de la réclamation";
        console.error(error);
        this.loading = false;
      },
    });
  }
}
