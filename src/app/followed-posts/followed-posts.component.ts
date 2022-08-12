import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Posts } from '../posts';
import { PostsService } from '../posts.service';
import { UserService } from '../user.service';
import { User } from '../users';

@Component({
  selector: 'app-followed-posts',
  templateUrl: './followed-posts.component.html',
  styleUrls: ['./followed-posts.component.scss'],
})
export class FollowedPostsComponent implements OnInit {
  posts: Posts[] = [];
  arrayUsers: User[] = [];
  me!: User;
  followedPosts: Posts[] = [];

  logged!: boolean;
  constructor(
    private auth$: AuthService,
    private posts$: PostsService,
    public fb: FormBuilder,
    private users$: UserService
  ) {}

  ngOnInit(): void {
    this.users$.getUsers().subscribe((users) => {
      this.arrayUsers = users;
      this.me = this.arrayUsers.find(
        (u) => u.id == localStorage.getItem('id')
      )!;
    });

    this.posts$.getPosts().subscribe((post) => {
      this.posts = post;
      this.logged = this.auth$.isLogged();
      for (const p of this.posts) {
        for (const f of this.me.friends) {
          if (p.autore == f.id) {
            this.followedPosts.push(p);
          }
        }
      }
    });
  }
}
