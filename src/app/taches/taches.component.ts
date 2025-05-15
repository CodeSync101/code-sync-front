import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import {TachesService} from "../services/taches.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.scss']
})

export class TachesComponent implements OnInit {

  matieres: any[] = [];
  filteredTaches: any[] = [];
  tacheForm: FormGroup;
  formType = 'Ajouter Tache';
  currentTacheId: number | null = null;
  searchText = '';

  constructor(
    private fb: FormBuilder,
    private tachesService: TachesService,
    private toastr: ToastrService
  ) {
    this.tacheForm = this.fb.group({
      titre: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllTaches();
  }

  getAllTaches() {
    this.tachesService.getAllTaches().subscribe((data: any[]) => {
      console.log(data); // structure de vos données ici
      this.matieres = data;
      this.filteredTaches = data;
    });
  }

  filterTaches(event: Event) {
    const search = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredTaches = this.matieres.filter((m) =>
      m.titre.toLowerCase().includes(search)
    );
  }


  openAddForm() {
    this.formType = 'Ajouter Tâche';
    this.tacheForm.reset();
    this.currentTacheId = null;
  }

  // Remplir le formulaire avec les données d'une matière existante pour modification
  populateForm(tache: any) {
    this.formType = 'Modifier Tâche';
    this.currentTacheId = tache.id;
    this.tacheForm.patchValue({
      titre : tache.titre,
      status: tache.status,
      notetache: tache.notetache,
    });
  }

  // Gérer l'ajout ou la modification d'une matière
  handleTache() {
    const tacheData = this.tacheForm.value;

    if (this.currentTacheId) {

      this.tachesService.updateTache(this.currentTacheId, tacheData).subscribe(() => {
        this.toastr.success('Tâche modifiée avec succès');
        this.getAllTaches();
      });
    } else {
      // Ajout d'une nouvelle matière
      this.tachesService.createTache(tacheData).subscribe(() => {
        this.toastr.success('Matière ajoutée avec succès');
        this.getAllTaches();
      });
    }

    document.querySelector<HTMLButtonElement>('.btn-close')?.click();
  }

  async deleteTache(id: number): Promise<void> {
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
        this.tachesService.deleteTache(id).subscribe(
          () => {
            this.getAllTaches();
            this.toastr.success('Tâche supprimée avec succès', 'Succès');
          },
          (error) => {
            this.toastr.error('Erreur lors de la suppression', 'Erreur');
          }
        );
      }
    });
  }

}

