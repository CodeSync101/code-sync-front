import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TachesComponent } from './taches.component';  // Import

const routes: Routes = [
  {
    path: '',
    component: TachesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),],  // Load this module's routes
  exports: [RouterModule]  // Make RouterModule available
})
export class TachesRoutingModule { }
