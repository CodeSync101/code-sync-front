import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './components/ticket/ticket.component';
import { FormsModule } from '@angular/forms';
import {ModulenoteRoutingModule} from "./modulenote-routing.module";
@NgModule({
  declarations: [
    TicketComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModulenoteRoutingModule
  ],
  exports: [
    TicketComponent
  ]
})
export class ModulenoteModule { }

