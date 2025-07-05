import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { RepositoryManagementComponent } from './repository-management.component';
import { RepositoryService } from './repository.service';
import { OrganizationService } from '../../services/organization.service';

const routes: Routes = [
  { path: '', component: RepositoryManagementComponent }
];

@NgModule({
  declarations: [
    RepositoryManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  providers: [RepositoryService, OrganizationService]
})
export class RepositoryManagementModule { } 