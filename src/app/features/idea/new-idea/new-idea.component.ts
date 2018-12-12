import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, CreateIdea } from '../state';
import { IdeaDTO } from '@app/models/idea';
import { selectAllIdeas, selectCurrentIdea } from '../state/idea.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-idea',
  templateUrl: './new-idea.component.html',
  styleUrls: ['./new-idea.component.scss']
})
export class NewIdeaComponent implements OnInit {
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {}

  submit(e: IdeaDTO) {
    this.store.dispatch(new CreateIdea(e));
    this.router.navigate(['/ideas']);
  }
}
