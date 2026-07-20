import { Routes } from '@angular/router';

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
    path: 'about',
    title: 'Über mich | Emre Kilic',
    loadComponent: () =>
      import('./pages/about/about').then(
        (component) => component.About,
      ),
  },
  {
    path: 'admin',
    title: 'Admin Login | Emre Kilic',
    loadComponent: () =>
      import('./pages/admin-login/admin-login').then(
        (component) => component.AdminLogin,
      ),
  },
  {
    path: 'admin/dashboard',
    title: 'Admin Dashboard | Emre Kilic',
    loadComponent: () =>
      import('./pages/admin-dashboard/admin-dashboard').then(
        (component) => component.AdminDashboard,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
