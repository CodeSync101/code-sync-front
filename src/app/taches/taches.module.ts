import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TachesRoutingModule } from './taches-routing.module';
import { TachesComponent } from './taches.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TachesComponent],
  imports: [
    CommonModule,
    TachesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TachesModule { }
