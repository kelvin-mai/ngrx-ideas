import * as Store from '@app/store';
import { User } from '@app/models/user';

export interface UserState {
  loading: boolean;
  loaded: boolean;
  users: User[];
  page: number;
}

export interface AppState extends Store.AppState {
  users: UserState;
}
