import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { BadgeModule } from './badge/badge.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes), // Gère les routes vers les composants standalone
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BadgeModule // Importe BadgeModule qui contient BadgeComponent
  ],
  // Pas de declarations ni d'exports pour les composants standalone
})
export class ComponentsModule {}