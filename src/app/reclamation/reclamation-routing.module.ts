import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReclamationListComponent } from './reclamation-list/reclamation-list.component';
import { ReclamationAddComponent } from './reclamation-add/reclamation-add.component';

const routes: Routes = [
  {
    path: '',
    component: ReclamationListComponent,
  },
  {
    path: 'add',
    component: ReclamationAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReclamationRoutingModule {}
