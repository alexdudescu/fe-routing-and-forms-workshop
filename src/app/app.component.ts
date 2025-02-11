import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { INote } from '~/components/note/note.model';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NoteListComponent,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
