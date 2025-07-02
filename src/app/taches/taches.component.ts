import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TachesService } from "../services/taches.service";
import { Router, ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.scss']
})

export class TachesComponent implements OnInit, AfterViewInit, OnDestroy {
  allTaches: any[] = [];
  tachesAFaire: any[] = [];
  tachesEnCours: any[] = [];
  tachesTermine: any[] = [];

  tacheForm: FormGroup;
  formType = 'Nouvelle Tâche';
  id: string = '';
  currentTacheId: number | null = null;
  searchText = '';
  private tacheModal: bootstrap.Modal | undefined;

  constructor(
    private fb: FormBuilder,
    private tachesService: TachesService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tacheForm = this.fb.group({
      titre: ['', Validators.required],
      status: ['À faire', Validators.required],
      notetache: [''],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getAllTaches();
  }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('tache_modal');
    if (modalElement) {
      this.tacheModal = new bootstrap.Modal(modalElement);
    }
  }

  ngOnDestroy(): void {
    if (this.tacheModal) {
      this.tacheModal.dispose();
    }
  }

  getAllTaches() {
    this.tachesService.getDataByMatiere(this.id).subscribe((data: any[]) => {
      this.allTaches = data;
      this.filterTaches();
    });
  }

  filterTaches(event?: Event) {
    if (event) {
      this.searchText = (event.target as HTMLInputElement).value.toLowerCase();
    }

    let filtered: any[] = [];
    if (!this.searchText) {
      filtered = [...this.allTaches];
    } else {
      filtered = this.allTaches.filter((tache) =>
        tache.titre.toLowerCase().includes(this.searchText)
      );
    }

    this.tachesAFaire = filtered.filter(t => t.status === 'À faire');
    this.tachesEnCours = filtered.filter(t => t.status === 'En cours');
    this.tachesTermine = filtered.filter(t => t.status === 'Terminé');
  }


  openAddForm() {
    this.formType = 'Nouvelle Tâche';
    this.currentTacheId = null;
    this.tacheForm.reset({ status: 'À faire', titre: '', notetache: '' });
    this.tacheModal?.show(); // <-- CHANGED
  }

  populateForm(tache: any) {
    this.formType = 'Modifier Tâche';
    this.currentTacheId = tache.id;
    this.tacheForm.patchValue(tache);
    this.tacheModal?.show();
  }

  handleTache() {
    if (this.tacheForm.invalid) {
      this.toastr.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    const tacheData = { ...this.tacheForm.value, matiereId: this.id };

    if (this.currentTacheId) {
      this.tachesService.updateTache(this.currentTacheId, tacheData).subscribe({
        next: (updatedTache) => {
          const index = this.allTaches.findIndex(t => t.id === this.currentTacheId);
          if (index !== -1) {
            this.allTaches[index] = updatedTache;
            this.filterTaches(); // Refresh the view
          }
          this.toastr.success('Tâche modifiée avec succès');
          this.closeModal();
        },
        error: (err) => {
          this.toastr.error('Erreur lors de la modification.', 'Erreur');
          console.error('API Error:', err);
          this.closeModal();
        }
      });
    } else {
      this.tachesService.createTache(tacheData).subscribe({
        next: (newlyCreatedTache) => {
          this.allTaches.push(newlyCreatedTache);
          this.filterTaches(); // Refresh the view
          this.toastr.success('Tâche ajoutée avec succès');
          this.closeModal();
        },
        error: (err) => {
          this.toastr.error('Erreur lors de l\'ajout.', 'Erreur');
          console.error('API Error:', err);
          this.closeModal();
        }
      });
    }
  }

  async deleteTache(id: number | null): Promise<void> {
    if (id === null) return;

    this.closeModal();
    setTimeout(async () => {
      const result = await Swal.fire({ });
      if (result.isConfirmed) {
        this.tachesService.deleteTache(id!).subscribe({
          next: () => {
            this.allTaches = this.allTaches.filter(t => t.id !== id);
            this.filterTaches(); // Refresh the view
            this.toastr.success('Tâche supprimée avec succès', 'Succès');
          },
          error: (err) => {
            this.toastr.error('Erreur lors de la suppression', 'Erreur');
          }
        });
      }
    }, 200);
  }

  actionTicket(id: any) {
    this.router.navigateByUrl(`tickets/` + id);
  }

  private closeModal() {
    this.tacheModal?.hide();
  }
}
