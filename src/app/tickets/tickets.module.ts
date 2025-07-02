import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TachesRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TicketsComponent],
  imports: [
    CommonModule,
    TachesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TicketsModule { }
