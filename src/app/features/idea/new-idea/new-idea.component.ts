import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, CreateIdea } from '../state';
import { IdeaDTO } from '@app/models/idea';

@Component({
  selector: 'app-new-idea',
  templateUrl: './new-idea.component.html',
  styleUrls: ['./new-idea.component.scss']
})
export class NewIdeaComponent {
  constructor(private store: Store<AppState>) {}

  submit(e: IdeaDTO) {
    this.store.dispatch(new CreateIdea(e));
  }
}
