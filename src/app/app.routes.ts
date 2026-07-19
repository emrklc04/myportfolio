import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'My Projects | Emre Kilic',
    loadComponent: () =>
      import('./pages/home/home').then((component) => component.Home),
  },
  {
    path: 'about',
    title: 'Über mich | Emre Kilic',
    loadComponent: () =>
      import('./pages/about/about').then((component) => component.About),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
