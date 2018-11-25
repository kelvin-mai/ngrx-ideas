import { Action } from '@ngrx/store';
import { Idea } from '@app/models/idea';

export enum IdeaActions {
  LOAD_IDEAS = '[Idea] Load ideas',
  LOAD_IDEAS_SUCCESS = '[Idea] Load ideas success'
}

export class LoadIdeas implements Action {
  readonly type = IdeaActions.LOAD_IDEAS;
}

export class LoadIdeasSuccess implements Action {
  readonly type = IdeaActions.LOAD_IDEAS_SUCCESS;
  constructor(public payload: Idea[]) {}
}

export type Action = LoadIdeas | LoadIdeasSuccess;
