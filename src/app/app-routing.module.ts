import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import {MatieresComponent} from "./matieres/matieres.component";
import {TachesComponent} from "./taches/taches.component";

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'note',
        loadChildren: () => import('./modulenote/modulenote.module').then(m => m.ModulenoteModule)
      },
      {
        path: 'matieres',
        loadChildren: () => import('./matieres/matieres.module').then(m => m.MatieresModule)
      },
      {
        path: 'taches',
        loadChildren: () => import('./taches/taches.module').then(m => m.TachesModule)
      },
      {
        path: 'tickets',
        loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule)
      }




    ]
  },

  {
    path: '**',
    redirectTo: '/starter'
  }
];
