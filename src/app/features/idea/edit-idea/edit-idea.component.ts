import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { withLatestFrom } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Idea, IdeaDTO } from '@app/models/idea';
import { AppState } from '@app/features/user/state';
import { selectCurrentIdea } from '../state/idea.selector';
import { UpdateIdea } from '../state';

@Component({
  selector: 'app-edit-idea',
  templateUrl: './edit-idea.component.html',
  styleUrls: ['./edit-idea.component.scss']
})
export class EditIdeaComponent implements OnInit {
  private subscription$: Subscription;
  idea: Idea;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.subscription$ = this.store
      .select(selectCurrentIdea)
      .pipe(withLatestFrom(this.store))
      .subscribe(([idea, store]) => {
        const currentUser = store.auth.user;
        if (idea && idea.author.id !== currentUser.id) {
          this.router.navigate(['/ideas']);
        }
      });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  submit(e: IdeaDTO) {
    this.store.dispatch(new UpdateIdea(e));
    this.router.navigate(['/ideas', this.idea.id]);
  }
}
