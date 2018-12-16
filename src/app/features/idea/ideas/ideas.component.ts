import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Idea } from '@app/models/idea';
import { User } from '@app/models/user';
import {
  AppState,
  LoadIdeas,
  UpvoteIdea,
  DownvoteIdea,
  selectAllIdeas,
  selectIdeaLoader
} from '../state';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit, OnDestroy {
  ideas: Observable<Idea[]>;
  loader: Observable<boolean>;
  auth$: Subscription;
  currentUser: User;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadIdeas());
    this.ideas = this.store.select(selectAllIdeas);
    this.loader = this.store.select(selectIdeaLoader);
    this.auth$ = this.store
      .select(state => state.auth.user)
      .subscribe(val => (this.currentUser = val));
  }

  ngOnDestroy() {
    this.auth$.unsubscribe();
  }

  upvote(id: string) {
    this.store.dispatch(new UpvoteIdea(id));
  }
  downvote(id: string) {
    this.store.dispatch(new DownvoteIdea(id));
  }
}
