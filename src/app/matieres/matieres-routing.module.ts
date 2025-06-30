import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatieresComponentF } from './matieres-component-f.component';  // Import MatiereComponent

const routes: Routes = [
  {
    path: '',
    component: MatieresComponentF  // When navigating to /matieres, show MatiereComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),],  // Load this module's routes
  exports: [RouterModule]  // Make RouterModule available
})
export class MatieresRoutingModule { }
