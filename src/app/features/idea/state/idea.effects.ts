import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, mergeMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import { ApiService } from '@app/services/api.service';
import * as fromError from '@app/store/actions/error.action';
import * as fromIdea from './idea.action';
import { AppState } from '.';
import { Router } from '@angular/router';

@Injectable()
export class IdeaEffects {
  constructor(
    private store: Store<AppState>,
    private action$: Actions,
    private api: ApiService,
    private router: Router
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

  @Effect()
  loadIdea$: Observable<Action> = this.action$.pipe(
    ofType<fromIdea.LoadIdea>(fromIdea.IdeaActions.LOAD_IDEA),
    tap(() => this.store.dispatch(new fromError.RemoveError())),
    withLatestFrom(this.store),
    mergeMap(([action, state]: [fromIdea.LoadIdea, AppState]) => {
      const idea = state.ideas.ideas[action.payload];
      if (idea) {
        return of(new fromIdea.LoadIdeaSuccess());
      } else {
        return this.api.getIdea(action.payload).pipe(
          mergeMap(res => of(new fromIdea.LoadIdeaSuccess(res))),
          catchError(err => of(new fromError.AddError(err)))
        );
      }
    })
  );

  @Effect()
  createIdeas$: Observable<Action> = this.action$.pipe(
    ofType<fromIdea.CreateIdea>(fromIdea.IdeaActions.CREATE_IDEA),
    tap(() => this.store.dispatch(new fromError.RemoveError())),
    mergeMap(action =>
      this.api.createIdea(action.payload).pipe(
        map(idea => new fromIdea.CreateIdeaSuccess(idea)),
        catchError(err => of(new fromError.AddError(err)))
      )
    )
  );

  @Effect()
  updateIdeas$: Observable<Action> = this.action$.pipe(
    ofType<fromIdea.UpdateIdea>(fromIdea.IdeaActions.UPDATE_IDEA),
    tap(() => this.store.dispatch(new fromError.RemoveError())),
    mergeMap(action =>
      this.api.updateIdea(action.payload.id, action.payload).pipe(
        map(idea => new fromIdea.UpdateIdeaSuccess(idea)),
        catchError(err => of(new fromError.AddError(err)))
      )
    )
  );

  @Effect()
  deleteIdeas$: Observable<Action> = this.action$.pipe(
    ofType<fromIdea.DeleteIdea>(fromIdea.IdeaActions.DELETE_IDEA),
    tap(() => this.store.dispatch(new fromError.RemoveError())),
    mergeMap(action =>
      this.api.deleteIdea(action.payload).pipe(
        map(idea => new fromIdea.DeleteIdeaSuccess(idea.id)),
        catchError(err => of(new fromError.AddError(err)))
      )
    )
  );

  @Effect({ dispatch: false })
  createIdeaRedirect$ = this.action$.pipe(
    ofType<fromIdea.CreateIdeaSuccess>(
      fromIdea.IdeaActions.CREATE_IDEA_SUCCESS
    ),
    tap(action => this.router.navigate(['/ideas', action.payload.id]))
  );

  @Effect({ dispatch: false })
  updateIdeaRedirect$ = this.action$.pipe(
    ofType<fromIdea.UpdateIdeaSuccess>(
      fromIdea.IdeaActions.UPDATE_IDEA_SUCCESS
    ),
    tap(action => this.router.navigate(['/ideas', action.payload.id]))
  );
}
