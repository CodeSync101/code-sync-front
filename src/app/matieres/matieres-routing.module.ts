import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatieresComponentF } from './matieres-component-f.component';

const routes: Routes = [
  {
    path: '',
    component: MatieresComponentF
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class MatieresRoutingModule { }
