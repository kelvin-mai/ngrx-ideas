import { Action } from '@ngrx/store';

export enum ErrorActionTypes {
  ADD_ERROR = '[ERROR] Add Error',
  REMOVE_ERROR = '[ERROR] Remove Error'
}

export class AddError implements Action {
  readonly type = ErrorActionTypes.ADD_ERROR;
  constructor(public payload: any) {}
}

export class RemoveError implements Action {
  readonly type = ErrorActionTypes.REMOVE_ERROR;
  constructor() {}
}

export type Action = AddError | RemoveError;
