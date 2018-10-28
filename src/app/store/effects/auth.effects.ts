import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, merge } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';

import { User } from '@app/models/user';
import { AuthService } from '@app/services/auth.service';
import * as fromAuth from '@app/store/actions/auth.action';
import * as fromError from '@app/store/actions/error.action';
import { AuthDTO } from '@app/models/auth';

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions, private authService: AuthService) {}

  @Effect()
  setInitialUser$: Observable<Action> = this.action$.pipe(
    ofType<fromAuth.SetInitialUser>(fromAuth.AuthActions.SET_INITIAL_USER),
    mergeMap((action: fromAuth.SetInitialUser) =>
      this.authService.whoami().pipe(
        map((user: User) => new fromAuth.SetCurrentUser(user)),
        catchError(err => of(new fromError.AddError(err)))
      )
    )
  );

  @Effect()
  loginUser$: Observable<Action> = this.action$.pipe(
    ofType<fromAuth.LoginUser>(fromAuth.AuthActions.LOGIN_USER),
    mergeMap((action: fromAuth.LoginUser) =>
      this.authService.auth('login', action.payload).pipe(
        map((user: User) => new fromAuth.SetCurrentUser(user)),
        catchError(err => of(new fromError.AddError(err)))
      )
    )
  );

  @Effect()
  registerUser$: Observable<Action> = this.action$.pipe(
    ofType<fromAuth.RegisterUser>(fromAuth.AuthActions.REGISTER_USER),
    mergeMap((action: fromAuth.RegisterUser) =>
      this.authService.auth('register', action.payload).pipe(
        map((user: User) => new fromAuth.SetCurrentUser(user)),
        catchError(err => of(new fromError.AddError(err)))
      )
    )
  );
}
