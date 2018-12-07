import { Action } from '@ngrx/store';
import { Idea } from '@app/models/idea';

export enum IdeaActions {
  LOAD_IDEAS = '[Idea] Load ideas',
  LOAD_IDEAS_SUCCESS = '[Idea] Load ideas success',

  LOAD_IDEA = '[Idea] Load idea',
  LOAD_IDEA_SUCCESS = '[Idea] Load idea success'
}

export class LoadIdeas implements Action {
  readonly type = IdeaActions.LOAD_IDEAS;
}

export class LoadIdeasSuccess implements Action {
  readonly type = IdeaActions.LOAD_IDEAS_SUCCESS;
  constructor(public payload: Idea[]) {}
}

export class LoadIdea implements Action {
  readonly type = IdeaActions.LOAD_IDEA;
  constructor(public payload: string) {}
}

export class LoadIdeaSuccess implements Action {
  readonly type = IdeaActions.LOAD_IDEA_SUCCESS;
  constructor(public payloaod: Idea) {}
}

export type Action = LoadIdeas | LoadIdeasSuccess | LoadIdea | LoadIdeaSuccess;
