import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Posts } from '../posts';
import { PostsService } from '../posts.service';
import { UserService } from '../user.service';
import { User } from '../users';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss'],
})
export class TrendsComponent implements OnInit {
  posts: Posts[] = [];
  arrayUsers: User[] = [];

  logged!: boolean;

  confirm: boolean = false;

  constructor(
    private auth$: AuthService,
    private posts$: PostsService,
    public fb: FormBuilder,
    private users$: UserService
  ) {}

  ngOnInit(): void {
    this.posts$.getPosts().subscribe((post) => {
      this.posts = post;
      this.posts.sort((a, b) => b.likes.length - a.likes.length);
      this.logged = this.auth$.isLogged();
    });
    this.users$.getUsers().subscribe((users) => {
      this.arrayUsers = users;
    });
  }

  deletePost(obj: Posts) {
    this.posts$.deletePost(obj.id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id != obj.id);
    });
  }
  modify(obj: Posts) {
    this.posts$.modifyPost(obj).subscribe(() => {
      this.posts$.getPosts().subscribe((res) => {
        this.posts = res;
      });
    });
  }
}
