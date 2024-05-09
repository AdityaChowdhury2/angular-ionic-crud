import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/create',
    pathMatch: 'full',
  },
  {
    path: 'user/:calledFrom',
    loadComponent: () =>
      import('./create-user/create-user.component').then(
        (m) => m.CreateUserComponent
      ),
  },
  {
    path: 'user/:calledFrom/:id',
    loadComponent: () =>
      import('./create-user/create-user.component').then(
        (m) => m.CreateUserComponent
      ),
  },
  // {
  //   path: 'edit/:id',
  //   loadComponent: () =>
  //     import('./create-user/create-user.component').then(
  //       (m) => m.CreateUserComponent
  //     ),
  // },
  {
    path: 'all-users',
    loadComponent: () =>
      import('./user/user.component').then((m) => m.UserComponent),
  },
];
