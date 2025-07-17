import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';


import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { RepositoryManagementComponent } from './repository-management/repository-management.component';
import { OrganizationManagementComponent } from './organization-management/organization-management.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ChatotComponent } from './chatot/chatot.component';
import { AuthGuard } from '../guards/auth.guard';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'profile',
				component: ProfileComponent,
				canActivate: [AuthGuard]
			},
			{
				path: 'settings',
				component: SettingsComponent,
				canActivate: [AuthGuard]
			},
			{
				path: 'users',
				loadChildren: () => import('./users-management/users-management.module').then(m => m.UsersManagementModule)
			},
			{
				path: 'organizations',
				loadChildren: () => import('./organization-management/organization-management.module').then(m => m.OrganizationManagementModule)
			},
			{
				path: 'repositories',
				loadChildren: () => import('./repository-management/repository-management.module').then(m => m.RepositoryManagementModule)
			},
			{
				path: 'table',
				component: TableComponent
			},
			{
				path: 'card',
				component: CardsComponent
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent
			},
			{
				path: 'badges',
				component: BadgeComponent
			},
		
			{
				path: 'nav',
				component: NgbdnavBasicComponent
			},
			{
				path: 'buttons',
				component: NgbdButtonsComponent
			},
			{
				path: 'chatbot',
				component: ChatotComponent,
				canActivate: [AuthGuard]
			}
		]
	}
];
