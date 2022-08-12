import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { PostsService } from '../posts.service';
import { UserService } from '../user.service';
import { AuthUser, User } from '../users';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isLogged!: boolean;
  id: any = localStorage.getItem('id');
  arrayUsers: User[] = [];
  me: User = {
    email: 'cippi@cippi.cippi',
    password: '$2a$10$XIhWcZhkVcbLTzNqq66eve.UkJ2nllf4gWuK9qaTPyfvKVEh/5mIC',
    nome: 'cippi',
    username: '...',
    eta: 123,
    friends: [],
    id: 12,
  };
  showFollowers = false;
  showFollowed = false;
  followers: User[] = [];
  followed: User[] = [];
  sub!: Subscription;
  hidden: boolean = false;
  hidden2: boolean = false;
  constructor(
    private auth$: AuthService,
    private router: Router,
    private post$: PostsService,
    private user$: UserService
  ) {}

  ngOnInit(): void {
    this.sub = this.auth$.authObs.subscribe((res) => {
      res ? (this.isLogged = true) : (this.isLogged = false);
    });
    this.user$.getUsers().subscribe((res) => {
      this.arrayUsers = res;
      this.me = this.arrayUsers.find((user) => user.id == this.id)!;
      this.followed = this.me.friends;
      for (const u of this.arrayUsers) {
        for (const f of u.friends) {
          if (f.id == this.me.id) {
            this.followers.push(u);
          }
        }
      }
    });
  }
  logout(): void {
    this.auth$.logout();
    this.router.navigate(['/login']);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
