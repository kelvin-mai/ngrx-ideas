import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Entity } from '@app/models/entity';
import { Idea } from '@app/models/idea';
import { IdeaState } from '.';

export const selectIdeaState = createFeatureSelector<IdeaState>('ideas');

export const selectAllIdeas = createSelector(
  selectIdeaState,
  (ideaState: IdeaState) => {
    const { ideas }: { ideas: Entity<Idea> } = ideaState;
    return Object.keys(ideas).map(id => ideas[id]);
  }
);
