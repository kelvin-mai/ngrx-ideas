import { createSelector } from '@ngrx/store';

import { AppState, UserState } from '.';

export const selectUserState = (state: AppState) => state.users;
export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);
