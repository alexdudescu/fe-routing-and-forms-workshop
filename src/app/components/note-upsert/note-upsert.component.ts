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
  private _formBuilder = inject(FormBuilder);
  private _noteService = inject(NoteService);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);

  private _isEdit = false;
  private _id = null;

  ngOnInit() {
    const { note, isEdit } = this._activatedRoute.snapshot.data;
    const id = this._activatedRoute.snapshot.params['id'];

    this._isEdit = isEdit;
    this._id = id;

    if (note as INote) {
      const { id, ...rest } = note;
      this.noteForm.setValue(rest);
    }
  }

  public noteForm = this._formBuilder.nonNullable.group({
    title: this._formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(10)]),
    content: this._formBuilder.nonNullable.control('', [Validators.required]),
  });

  public onSubmit() {
    const value = this.noteForm.value as INote;

    if (this._isEdit) {
      this._noteService
        .edit(this._id!, value)
        .pipe(
          tap(() => {
            this._router.navigate(['/']);
          }),
        )
        .subscribe();
    } else {
      this._noteService
        .add(value)
        .pipe(
          tap(() => {
            this._router.navigate(['/']);
          }),
        )
        .subscribe();
    }
  }
}
