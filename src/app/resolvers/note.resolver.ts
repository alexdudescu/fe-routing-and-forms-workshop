import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { INote } from "~/components/note/note.model";
import { NoteService } from "~/services/note.service";

export const noteResolver: ResolveFn<INote | null> = (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const notesService = inject(NoteService);
  const id = route.params['id'];

  return notesService.get(id);
}
