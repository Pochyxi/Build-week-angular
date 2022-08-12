import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from './users';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class FriendRequestService {
  sub = new Subject<User[]>();
  obs = this.sub.asObservable();
  friendsArray: User[] = [];
  constructor(private http: HttpClient, private user$: UserService) {}

  sendRequest() {
    return this.user$.getUsers();
  }
}
