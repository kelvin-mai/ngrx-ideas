import { ActionReducerMap } from '@ngrx/store';

import { AuthEffects } from './effects/auth.effects';

import { authReducer, AuthState } from './reducers/auth.reducer';
import { errorReducer, ErrorState } from './reducers/error.reducer';

export const effects = [AuthEffects];

export const reducers: ActionReducerMap<any> = {
  auth: authReducer,
  error: errorReducer
};

export interface AppState {
  auth: AuthState;
  error: ErrorState;
}
