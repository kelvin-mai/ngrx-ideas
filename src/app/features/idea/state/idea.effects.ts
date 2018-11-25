import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, mergeMap, catchError, map } from 'rxjs/operators';

import { ApiService } from '@app/services/api.service';
import * as fromError from '@app/store/actions/error.action';
import * as fromIdea from './idea.action';
import { AppState } from '.';

@Injectable()
export class IdeaEffects {
  constructor(
    private store: Store<AppState>,
    private action$: Actions,
    private api: ApiService
  ) {}

  @Effect()
  loadIdeas$: Observable<Action> = this.action$.pipe(
    ofType<fromIdea.LoadIdeas>(fromIdea.IdeaActions.LOAD_IDEAS),
    tap(() => this.store.dispatch(new fromError.RemoveError())),
    mergeMap(action =>
      this.api.getIdeas().pipe(
        map(ideas => new fromIdea.LoadIdeasSuccess(ideas)),
        catchError(err => of(new fromError.AddError(err)))
      )
    )
  );
}
