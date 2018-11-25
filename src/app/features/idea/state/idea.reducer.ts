import { IdeaState } from '.';
import { Action, IdeaActions } from './idea.action';

const initialState: IdeaState = {
  ideas: {},
  page: 0,
  loading: false,
  loaded: false
};

export const ideaReducer: (state: IdeaState, action: Action) => IdeaState = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case IdeaActions.LOAD_IDEAS:
      const { page } = state;
      return { ...state, page: page + 1, loading: true, loaded: false };
    case IdeaActions.LOAD_IDEAS_SUCCESS:
      const ideas = action.payload.reduce(
        (acc, idea) => ({ ...acc, [idea.id]: idea }),
        state.ideas
      );
      return { ...state, ideas, loading: false, loaded: true };
    default:
      return state;
  }
};
