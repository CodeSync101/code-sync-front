import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { BadgeModule } from './badge/badge.module';
import { ChatotComponent } from './chatot/chatot.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ProfileComponent,
    FormsModule,
    BadgeModule
  ],
  declarations: [
    SettingsComponent,
    ChatotComponent
  ]
})

export class ComponentsModule {}
