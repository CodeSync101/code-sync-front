import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommitsRoutingModule} from "./commits-routing.module";
import {CommitsComponent} from "./commits.component";

@NgModule({
  declarations: [CommitsComponent],
  imports: [
    CommonModule,
    CommitsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CommitsModule { }
