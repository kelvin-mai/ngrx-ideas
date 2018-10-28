import { Idea } from '@app/models/idea';

export interface User {
  id: string;
  username: string;
  created: Date;
  token?: string;
  bookmarks?: Idea;
}
