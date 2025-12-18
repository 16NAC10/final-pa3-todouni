import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'new',
    loadComponent: () => import('./pages/task-form/task-form.page').then( m => m.TaskFormPage)
  },
  {
    path: 'task-detail/:id',
    loadComponent: () => import('./pages/task-detail/task-detail.page').then(m => m.TaskDetailPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];
