import { ErrorActionTypes, Action } from '../actions/error.action';

export interface ErrorState {
  message: string | null;
}

const initialState: ErrorState = {
  message: null
};

export const errorReducer: (state: ErrorState, action: Action) => ErrorState = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case ErrorActionTypes.ADD_ERROR:
      return { ...state, message: action.payload };
    case ErrorActionTypes.REMOVE_ERROR:
      return { ...state, message: null };
    default:
      return state;
  }
};
