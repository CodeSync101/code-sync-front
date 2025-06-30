import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReclamationListComponent } from './reclamation-list/reclamation-list.component';
import { ReclamationRoutingModule } from './reclamation-routing.module';
import { ReclamationAddComponent } from './reclamation-add/reclamation-add.component';

@NgModule({
  declarations: [ReclamationListComponent, ReclamationAddComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ReclamationRoutingModule,
  ],
  exports: [ReclamationListComponent, ReclamationAddComponent],
})
export class ReclamationModule {}
