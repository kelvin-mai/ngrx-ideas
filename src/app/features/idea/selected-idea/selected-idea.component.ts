import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Idea } from '@app/models/idea';
import { User } from '@app/models/user';
import { AppState, selectCurrentIdea } from '../state';

@Component({
  selector: 'app-selected-idea',
  templateUrl: './selected-idea.component.html',
  styleUrls: ['./selected-idea.component.scss']
})
export class SelectedIdeaComponent implements OnInit, OnDestroy {
  private subscription$: Subscription[];
  idea: Idea;
  currentUser: User;
  showForm: boolean = false;
  comment = '';

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    const idea$ = this.store
      .select(selectCurrentIdea)
      .subscribe(idea => (this.idea = idea));

    const user$ = this.store
      .select(state => state.auth.user)
      .subscribe(user => (this.currentUser = user));

    this.subscription$ = [idea$, user$];
  }

  ngOnDestroy() {
    this.subscription$.forEach(s => s.unsubscribe());
  }

  submit() {
    console.log('submitted', this.comment);
  }
}
