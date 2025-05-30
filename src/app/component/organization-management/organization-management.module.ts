import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { OrganizationManagementComponent } from './organization-management.component';

@NgModule({
  declarations: [
    OrganizationManagementComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrganizationManagementComponent
      }
    ])
  ]
})
export class OrganizationManagementModule { } 