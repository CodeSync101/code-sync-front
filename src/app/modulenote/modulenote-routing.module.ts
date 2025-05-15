// src/app/modulenote/modulenote-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketComponent } from './components/ticket/ticket.component';

const routes: Routes = [
  {
    path: '',
    component: TicketComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulenoteRoutingModule { }
