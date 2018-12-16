import { Idea } from '@app/models/idea';
import { Entity } from '@app/models/entity';
import * as Store from '@app/store';

export interface IdeaState {
  ideas: Entity<Idea>;
  page: number;
  loading: boolean;
  loaded: boolean;
  selectedIdea?: string;
}

export interface AppState extends Store.AppState {
  ideas: IdeaState;
}

export * from './idea.action';
export * from './idea.effects';
export * from './idea.reducer';
export * from './idea.selector';
