import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatiereService } from '../services/matiere.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-matiere',
  templateUrl: './matieres.component.html',
})
export class MatieresComponent implements OnInit {

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
    private router : Router
  ) {
    this.matiereForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllMatieres();
  }

  getAllMatieres() {
    this.matiereService.getAllMatieres().subscribe((data: any[]) => {
      console.log(data); // Vérifiez la structure de vos données ici
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

  // Remplir le formulaire avec les données d'une matière existante pour modification
  populateForm(matiere: any) {
    this.formType = 'Modifier Projet';
    this.currentMatiereId = matiere.id;
    this.matiereForm.patchValue({
      libelle : matiere.libelle,
      description: matiere.description,
    });
  }

  // Gérer l'ajout ou la modification d'une matière
  handleMatiere() {
    const matiereData = this.matiereForm.value;

    if (this.currentMatiereId) {

      this.matiereService.updateMatiere(this.currentMatiereId, matiereData).subscribe(() => {
        this.toastr.success('Matière modifiée avec succès');
        this.getAllMatieres();
      });
    } else {
      // Ajout d'une nouvelle matière
      this.matiereService.createMatiere(matiereData).subscribe(() => {
        this.toastr.success('Matière ajoutée avec succès');
        this.getAllMatieres();
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
            this.getAllMatieres();
            this.toastr.success('Matière supprimée avec succès', 'Succès');
          },
          (error) => {
            this.toastr.error('Erreur lors de la suppression', 'Erreur');
          }
        );
      }
    });
  }


  actionTache(id:any){
    this.router.navigateByUrl(`taches/`+ id);
  }

}
