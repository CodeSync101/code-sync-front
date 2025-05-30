import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { UsersManagementComponent } from './users-management.component';
import { UserService } from '../../services/user.service';

const routes: Routes = [
  { path: '', component: UsersManagementComponent }
];

@NgModule({
  declarations: [
    UsersManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  providers: [UserService],
  exports: []
})
export class UsersManagementModule { }