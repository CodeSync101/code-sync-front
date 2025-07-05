import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommitsComponent} from "./commits.component";

const routes: Routes = [
  { path: '', component: CommitsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class CommitsRoutingModule { }
