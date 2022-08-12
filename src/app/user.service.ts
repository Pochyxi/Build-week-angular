import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { Posts } from './posts';
import { PostsService } from './posts.service';
import { User } from './users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/users/';

  sub = new Subject<User[]>();
  obs = this.sub.asObservable();

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.url);
  }
  getSingleUser(id: number) {
    return this.http.get<User>('http://localhost:3000/users/' + id);
  }

  modifyUsers(obj: any) {
    return this.http.patch<User>(this.url + obj.id, obj);
  }
  deleteUsers(id: string | number | null) {
    return this.http.delete<User>(this.url + id);
  }
}
