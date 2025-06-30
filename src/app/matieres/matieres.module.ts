import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatieresRoutingModule } from './matieres-routing.module';
import { MatieresComponentF } from './matieres-component-f.component';
import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

var schemas;
// Ajout de ToastrModule


@NgModule({
  declarations: [
    MatieresComponentF
  ],
  imports: [
    CommonModule,
    MatieresRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,

  ],   schemas: [NO_ERRORS_SCHEMA]
})
export class MatieresModule { }
