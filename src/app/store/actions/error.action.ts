import { Action } from '@ngrx/store';

export enum ErrorActions {
  ADD_ERROR = '[ERROR] Add Error',
  REMOVE_ERROR = '[ERROR] Remove Error'
}

export class AddError implements Action {
  readonly type = ErrorActions.ADD_ERROR;
  constructor(public payload: any) {}
}

export class RemoveError implements Action {
  readonly type = ErrorActions.REMOVE_ERROR;
  constructor() {}
}

export type Action = AddError | RemoveError;
