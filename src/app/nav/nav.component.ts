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
  userName!: any;

  sub!: Subscription;

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
      this.userName = this.arrayUsers.find(
        (user) => user.id == this.id
      )?.username;
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
