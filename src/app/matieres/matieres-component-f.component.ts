import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatiereService } from '../services/matiere.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GroupRepoDTO } from "../models/user";
import { RepositoryService } from "../component/repository-management/repository.service";
import { forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-matiere',
  templateUrl: './matieres-component-f.component.html',
})
export class MatieresComponentF implements OnInit {
  matieres: any[] = [];
  filteredMatieres: any[] = [];
  matiereForm: FormGroup;
  formType = 'Ajouter Projet';
  currentMatiereId: number | null = null;
  searchText = '';
  groups: GroupRepoDTO[] = [];
  isLoading = true;

  private projectGroupAssociations: Map<number, number> = new Map();

  constructor(
    private fb: FormBuilder,
    private matiereService: MatiereService,
    private toastr: ToastrService,
    private router: Router,
    private repositoryService: RepositoryService
  ) {
    this.matiereForm = this.fb.group({
      libelle: ['', Validators.required],
      description: [''],
      noteMatiere: [''],
      groupId: [null]
    });
  }

  ngOnInit(): void {
    this.loadAssociationsFromStorage();
    this.refreshData();
  }

  refreshData() {
    this.isLoading = true;
    forkJoin({
      projets: this.matiereService.getAllMatieresF(),
      groupes: this.repositoryService.getAllGroups()
    }).pipe(
      map(result => {
        const projets = result.projets || [];
        const groupes = result.groupes || [];
        this.groups = groupes;
        const groupMap = new Map(groupes.map(g => [g.id, g]));

        return projets.map(projet => {
          const associatedGroupId = this.projectGroupAssociations.get(projet.id);
          const group = associatedGroupId ? groupMap.get(associatedGroupId) : null;
          return { ...projet, group: group };
        });
      }),
      catchError(() => {
        this.toastr.error('Erreur critique lors du chargement des projets.', 'Erreur');
        this.isLoading = false;
        return of([]);
      })
    ).subscribe(projetsAvecGroupes => {
      this.matieres = projetsAvecGroupes;
      this.filteredMatieres = projetsAvecGroupes;
      this.isLoading = false;
    });
  }

  handleMatiere() {
    if (this.matiereForm.invalid) return;

    const formData = this.matiereForm.value;
    const selectedGroupId = formData.groupId;

    let action$;
    if (this.currentMatiereId) {
      const payload = {
        id: this.currentMatiereId,
        ...formData
      };
      action$ = this.matiereService.updateMatiere(this.currentMatiereId, payload);
    } else {
      action$ = this.matiereService.createMatiere(formData);
    }

    action$.subscribe((response: any) => {
      const message = this.currentMatiereId ? 'Projet modifié avec succès' : 'Projet ajouté avec succès';
      this.toastr.success(message);

      const projectId = this.currentMatiereId || response?.id;

      if(projectId) {
        if (selectedGroupId) {
          this.projectGroupAssociations.set(projectId, selectedGroupId);
        } else {
          this.projectGroupAssociations.delete(projectId);
        }
        this.saveAssociationsToStorage();
      } else {
        this.toastr.error("Erreur: Impossible de lier le groupe car l'ID du projet est inconnu.");
      }

      this.refreshData();
      document.querySelector<HTMLButtonElement>('.btn-close')?.click();
    });
  }

  async deleteMatiere(id: number): Promise<void> {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr(e) ?', text: 'Vous ne pourrez pas revenir en arrière !', icon: 'warning',
      showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !', cancelButtonText: 'Annuler'
    });
    if (result.isConfirmed) {
      this.matiereService.deleteMatiere(id).subscribe(() => {
        this.toastr.success('Projet supprimé avec succès');
        this.projectGroupAssociations.delete(id);
        this.saveAssociationsToStorage();
        this.refreshData();
      });
    }
  }

  populateForm(matiere: any) {
    this.formType = 'Modifier Projet';
    this.currentMatiereId = matiere.id;
    this.matiereForm.patchValue({
      libelle: matiere.libelle,
      description: matiere.description,
      noteMatiere: matiere.noteMatiere === 'Pas de note' ? '' : matiere.noteMatiere,
      groupId: matiere.group?.id || null
    });
  }

  private saveAssociationsToStorage(): void {
    localStorage.setItem('projectGroupAssociations', JSON.stringify(Array.from(this.projectGroupAssociations.entries())));
  }

  private loadAssociationsFromStorage(): void {
    const savedData = localStorage.getItem('projectGroupAssociations');
    if (savedData) {
      try {
        this.projectGroupAssociations = new Map(JSON.parse(savedData));
      } catch (e) {
        console.error("Erreur lors de la lecture du localStorage, réinitialisation.", e);
        this.projectGroupAssociations = new Map();
      }
    }
  }

  openAddForm() { this.formType = 'Ajouter Projet'; this.matiereForm.reset(); this.currentMatiereId = null; }
  filterMatieres(event: Event) { const search = (event.target as HTMLInputElement).value.toLowerCase(); this.filteredMatieres = this.matieres.filter((m) => m.libelle.toLowerCase().includes(search)); }
  actionTache(id: any) { this.router.navigateByUrl(`taches/` + id); }
}
