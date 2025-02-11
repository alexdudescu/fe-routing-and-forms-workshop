import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { INote } from '~/components/note/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private _baseUrl = '/api/notes';
  private _httpClient = inject(HttpClient);

  public getAll() {
    return this._httpClient.get<Array<INote>>(this._baseUrl);
  }

  public get(id: number) {
    return this._httpClient.get<INote | null>(`${this._baseUrl}/${id}`).pipe(
      catchError(() => {
        return of(null); // In case something goes wrong return null
      }),
    );
  }

  public add(note: Omit<INote, 'id'>) {
    return this._httpClient.post(`${this._baseUrl}`, note);
  }

  public edit(id: number, note: Omit<INote, 'id'>) {
    return this._httpClient.put(`${this._baseUrl}/${id}`, note);
  }

  public delete(id: number) {
    return this._httpClient.delete(`${this._baseUrl}/${id}`);
  }
}
