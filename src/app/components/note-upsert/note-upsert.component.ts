import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NoteService } from '~/services/note.service';
import { tap } from 'rxjs';
import { INote } from '../note/note.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './note-upsert.component.html',
  styleUrl: './note-upsert.component.css',
})
export class NoteUpsertComponent {
  private _activatedRoute = inject(ActivatedRoute);

  isEdit = false;
  id = null;
  note = null;

  ngOnInit() {
    const { note, isEdit } = this._activatedRoute.snapshot.data;
    const id = this._activatedRoute.snapshot.params['id'];

    this.isEdit = isEdit;
    this.id = id;
    this.note = note;
  }

  public onSubmit() {
  }
}
