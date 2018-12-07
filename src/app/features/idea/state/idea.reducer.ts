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
      return { ...state, loading: true, loaded: false };
    case IdeaActions.LOAD_IDEA:
      return { ...state, loading: true, loaded: false };
    case IdeaActions.LOAD_IDEAS_SUCCESS:
      const ideas = action.payload.reduce(
        (acc, idea) => ({ ...acc, [idea.id]: idea }),
        state.ideas
      );
      return { ...state, ideas, loading: false, loaded: true };
    case IdeaActions.LOAD_IDEA_SUCCESS:
      return {
        ...state,
        selectedIdea: action.payloaod,
        loading: false,
        loaded: true
      };
    default:
      return state;
  }
};
