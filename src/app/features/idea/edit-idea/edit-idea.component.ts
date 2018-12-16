import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { withLatestFrom } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

import { Idea, IdeaDTO } from '@app/models/idea';
import { AppState } from '@app/features/user/state';
import { UpdateIdea, selectCurrentIdea, selectIdeaLoader } from '../state';

@Component({
  selector: 'app-edit-idea',
  templateUrl: './edit-idea.component.html',
  styleUrls: ['./edit-idea.component.scss']
})
export class EditIdeaComponent implements OnInit {
  private subscription$: Subscription;
  idea: Idea;
  loader: Observable<boolean>;
  processSubmission = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.loader = this.store.select(selectIdeaLoader);

    this.subscription$ = this.store
      .select(selectCurrentIdea)
      .pipe(withLatestFrom(this.store))
      .subscribe(([idea, store]) => {
        const currentUser = store.auth.user;
        this.idea = idea;
        if (currentUser && idea && idea.author.id !== currentUser.id) {
          this.router.navigate(['/ideas']);
        }
      });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  submit(e: IdeaDTO) {
    this.processSubmission = true;
    this.store.dispatch(new UpdateIdea({ ...e, id: this.idea.id }));
    this.router.navigate(['/ideas', this.idea.id]);
  }
}
