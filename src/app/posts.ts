import { Comment } from '@angular/compiler';
import { Comments } from './comments';
import { User } from './users';

export interface Posts {
  id: number;
  autore: number | string | undefined;
  autorname: string;
  title: string;
  body: string;
  likes: User[];
  comments: Comments[];
}
