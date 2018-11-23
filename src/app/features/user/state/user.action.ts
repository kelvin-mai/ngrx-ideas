import { Action } from '@ngrx/store';
import { User } from '@app/models/user';

export enum UserActions {
  LOAD_USERS = '[User] Load users',
  LOAD_USERS_SUCCESS = '[User] Load users success',

  LOAD_USER = '[User] Load user',
  LOAD_USER_SUCCESS = '[User] Load user success'
}

export class LoadUsers implements Action {
  readonly type = UserActions.LOAD_USERS;
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActions.LOAD_USERS_SUCCESS;
  constructor(public payload: User[]) {}
}

export class LoadUser implements Action {
  readonly type = UserActions.LOAD_USER;
  constructor(public payload: string) {}
}

export class LoadUserSuccess implements Action {
  readonly type = UserActions.LOAD_USER_SUCCESS;
  constructor(public payload: User) {}
}

export type Action = LoadUsers | LoadUsersSuccess | LoadUser | LoadUserSuccess;
