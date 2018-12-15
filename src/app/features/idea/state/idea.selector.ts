import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Entity } from '@app/models/entity';
import { Idea } from '@app/models/idea';
import { IdeaState } from '.';

export const ideaEntityToArray = (ideaState: IdeaState) => {
  const { ideas }: { ideas: Entity<Idea> } = ideaState;
  return Object.keys(ideas).map(id => ideas[id]);
};

export const selectIdeaState = createFeatureSelector<IdeaState>('ideas');

export const selectAllIdeas = createSelector(
  selectIdeaState,
  ideaEntityToArray
);

export const selectIdeaLoader = createSelector(
  selectIdeaState,
  (ideaState: IdeaState) => ideaState.loading
);

export const selectCurrentIdea = createSelector(
  selectIdeaState,
  (ideaState: IdeaState) => {
    const { ideas, selectedIdea } = ideaState;
    return ideas[selectedIdea];
  }
);
