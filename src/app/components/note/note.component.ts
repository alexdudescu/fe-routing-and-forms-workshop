import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { INote } from './note.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { NoteService } from '~/services/note.service';
import { tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
})
export class NoteComponent {
  private _noteService = inject(NoteService);
  private _router = inject(Router);

  noteData = input.required<INote>();
  deleted = output<void>();

  delete() {
    this._noteService.delete(this.noteData().id).pipe(
      tap(() => this._router.navigate(['/'])),
      tap(() => this.deleted.emit()),
    ).subscribe();
  }
}
