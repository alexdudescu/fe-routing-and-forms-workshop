import { Routes } from '@angular/router';
import { noteResolver } from './resolvers/note.resolver';
import { secretGuard } from './guards/secret.guard';
import { SecretService } from './services/secret.service';

export const routes: Routes = [
  {
    path: '',
    canActivate: [
      secretGuard
    ],
    providers: [
      SecretService
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/note-list/note-list.component').then(
            (c) => c.NoteListComponent,
          ),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./components/note-upsert/note-upsert.component').then(
            (c) => c.NoteUpsertComponent,
          ),
        data: {
          isEdit: false,
        },
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./components/note-upsert/note-upsert.component').then(
            (c) => c.NoteUpsertComponent,
          ),
        resolve: {
          note: noteResolver,
        },
        data: {
          isEdit: true,
        },
      },
      {
        path: '**',
        redirectTo: '/',
      },
    ],
  },
];
