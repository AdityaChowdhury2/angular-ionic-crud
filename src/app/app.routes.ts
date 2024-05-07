import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create-user/create-user.component').then(
        (m) => m.CreateUserComponent
      ),
  },
];
