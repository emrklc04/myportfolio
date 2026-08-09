import { Routes } from '@angular/router';

import {
  adminGuard,
} from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'My Projects | Emre Kilic',
    loadComponent: () =>
      import('./pages/home/home').then(
        (component) => component.Home,
      ),
  },
  {
    path: 'impressum',
    title: 'Impressum | Emre Kilic',
    loadComponent: () =>
      import('./pages/impressum/impressum').then(
        (component) => component.Impressum,
      ),
  },
  {
    path: 'datenschutz',
    title: 'Datenschutz | Emre Kilic',
    loadComponent: () =>
      import('./pages/datenschutz/datenschutz').then(
        (component) => component.Datenschutz,
      ),
  },
  {
    path: 'admin',
    title: 'Admin Login | Emre Kilic',
    loadComponent: () =>
      import(
        './pages/admin-login/admin-login'
        ).then(
        (component) =>
          component.AdminLogin,
      ),
  },
  {
    path: 'admin/dashboard',
    title: 'Admin Dashboard | Emre Kilic',
    canActivate: [
      adminGuard,
    ],
    loadComponent: () =>
      import(
        './pages/admin-dashboard/admin-dashboard'
        ).then(
        (component) =>
          component.AdminDashboard,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
