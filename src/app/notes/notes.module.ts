import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NotesRoutingModule } from './notes-routing.module';
import { NoteListComponent } from './note-list/note-list.component';

@NgModule({
  declarations: [NoteListComponent],
  imports: [CommonModule, NotesRoutingModule, ReactiveFormsModule],
})
export class NotesModule {}
