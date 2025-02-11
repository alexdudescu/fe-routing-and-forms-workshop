import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NoteService } from '~/services/note.service';
import { NoteComponent } from '~/components/note/note.component';

@Component({
  standalone: true,
  imports: [CommonModule, NoteComponent],
  selector: 'note-list',
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NoteListComponent {
  private _noteService = inject(NoteService);
  public noteList$ = this._noteService.getAll();

  deleted() {
    this.noteList$ = this._noteService.getAll();
  }
}
