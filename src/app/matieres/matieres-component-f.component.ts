import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatiereService } from '../services/matiere.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matiere',
  templateUrl: './matieres-component-f.component.html',
})
export class MatieresComponentF implements OnInit {

  matieres: any[] = [];
  filteredMatieres: any[] = [];
  matiereForm: FormGroup;
  formType = 'Ajouter Matière';
  currentMatiereId: number | null = null;
  searchText = '';

  constructor(
    private fb: FormBuilder,
    private matiereService: MatiereService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.matiereForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      noteMatiere: ['', [
        Validators.min(0),
        Validators.max(20),
        this.floatValidator.bind(this)
      ]],
    });
  }

  floatValidator(control: AbstractControl): ValidationErrors | null {
    const val = control.value;
    if (val === null || val === '') {
      return null;
    }
    const regex = /^\d+(\.\d+)?$/;
    if (!regex.test(val)) {
      return { notFloat: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.getAllMatieresF();
  }

  getAllMatieresF() {
    this.matiereService.getAllMatieresF().subscribe((data: any[]) => {
      console.log(data);
      this.matieres = data;
      this.filteredMatieres = data;
    });
  }

  filterMatieres(event: Event) {
    const search = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredMatieres = this.matieres.filter((m) =>
      m.libelle.toLowerCase().includes(search)
    );
  }

  openAddForm() {
    this.formType = 'Ajouter Projet';
    this.matiereForm.reset();
    this.currentMatiereId = null;
  }

  populateForm(matiere: any) {
    this.formType = 'Modifier Projet';
    this.currentMatiereId = matiere.id;
    this.matiereForm.patchValue({
      libelle: matiere.libelle,
      description: matiere.description,
      noteMatiere: matiere.noteMatiere,
    });
  }

  handleMatiere() {
    const matiereData = this.matiereForm.value;

    if (this.currentMatiereId) {
      this.matiereService.updateMatiere(this.currentMatiereId, matiereData).subscribe(() => {
        this.toastr.success('Matière modifiée avec succès');
        this.getAllMatieresF();
      });
    } else {
      this.matiereService.createMatiere(matiereData).subscribe(() => {
        this.toastr.success('Matière ajoutée avec succès');
        this.getAllMatieresF();
      });
    }

    document.querySelector<HTMLButtonElement>('.btn-close')?.click();
  }

  async deleteMatiere(id: number): Promise<void> {
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
        this.matiereService.deleteMatiere(id).subscribe(
          () => {
            this.getAllMatieresF();
            this.toastr.success('Matière supprimée avec succès', 'Succès');
          },
          (error) => {
            this.toastr.error('Erreur lors de la suppression', 'Erreur');
          }
        );
      }
    });
  }

  actionTache(id: any) {
    this.router.navigateByUrl(`taches/` + id);
  }

}
