import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full',
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create-user/create-user.component').then(
        (m) => m.CreateUserComponent
      ),
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./user/user.component').then((m) => m.UserComponent),
  },
  {
    path: 'category',
    loadComponent: () =>
      import('./category/category.page').then((m) => m.CategoryPage),
  },
];
