import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, catchError, mergeMap, map } from 'rxjs/operators';

import { ApiService } from '@app/services/api.service';
import { AppState } from '@app/features/user/state';
import * as fromUser from '@app/features/user/state/user.action';
import * as fromError from '@app/store/actions/error.action';

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private api: ApiService
  ) {}

  @Effect()
  loadUsers$: Observable<Action> = this.action$.pipe(
    ofType<fromUser.LoadUsers>(fromUser.UserActions.LOAD_USERS),
    tap(() => this.store.dispatch(new fromError.RemoveError())),
    mergeMap(() =>
      this.api.getUsers().pipe(
        map(users => new fromUser.LoadUsersSuccess(users)),
        catchError(err => of(new fromError.AddError(err.error)))
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
