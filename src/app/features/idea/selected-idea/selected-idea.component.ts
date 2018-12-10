import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../state';
import { selectCurrentIdea } from '../state/idea.selector';
import { Idea } from '@app/models/idea';

@Component({
  selector: 'app-selected-idea',
  templateUrl: './selected-idea.component.html',
  styleUrls: ['./selected-idea.component.scss']
})
export class SelectedIdeaComponent implements OnInit, OnDestroy {
  private subscription$: Subscription;
  idea: Idea;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.subscription$ = this.store
      .select(selectCurrentIdea)
      .subscribe(idea => (this.idea = idea));
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
