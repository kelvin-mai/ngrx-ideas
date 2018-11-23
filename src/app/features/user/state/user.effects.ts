import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, catchError, mergeMap, map } from 'rxjs/operators';

import { AppState } from '@app/features/user/state';
import {
  UserActions,
  LoadUsers,
  LoadUsersSuccess
} from '@app/features/user/state/user.action';
import { RemoveError, AddError } from '@app/store/actions/error.action';
import { ApiService } from '@app/services/api.service';

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private api: ApiService
  ) {}

  @Effect()
  loadUsers$: Observable<Action> = this.action$.pipe(
    ofType<LoadUsers>(UserActions.LOAD_USERS),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap(action =>
      this.api.getUsers().pipe(
        map(users => new LoadUsersSuccess(users)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  // @Effect()
  // loadUser$: Observable<Action> = this.action$.pipe(
  //   ofType<LoadUser>(UserActions.LOAD_USER),
  //   tap(() => this.store.dispatch(new RemoveError())),
  //   mergeMap(action =>
  //     this.api.getUser(action.payload).pipe(
  //       map(user => new SetUsers(user)),
  //       catchError(err => of(new AddError(err.error)))
  //     )
  //   )
  // );
}
