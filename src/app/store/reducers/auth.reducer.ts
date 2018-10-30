import { AuthActions, Action } from '@app/store/actions/auth.action';
import { User } from '@app/models/user';

export interface AuthState {
  user: User | null;
  loading: boolean;
  loaded: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  loaded: false
};

export const authReducer: (state: AuthState, action: Action) => AuthState = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case AuthActions.LOGIN_USER:
      return { ...state, loading: true, loaded: false };
    case AuthActions.REGISTER_USER:
      return { ...state, loading: true, loaded: false };
    case AuthActions.SET_INITIAL_USER:
      return { ...state, loading: true, loaded: false };
    case AuthActions.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        loaded: true
      };
    default:
      return state;
  }
};
