import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Posts } from '../posts';
import { PostsService } from '../posts.service';
import { UserService } from '../user.service';
import { User } from '../users';

@Component({
  selector: 'app-single-user-page',
  templateUrl: './single-user-page.component.html',
  styleUrls: ['./single-user-page.component.scss'],
})
export class SingleUserPageComponent implements OnInit {
  user: User = {
    email: 'immolettina@gmail.com',
    password: '$2a$10$5gdq8smkTJKpHiHhY6PXzegp4QjQB9Y2CGvPWtEn1FBGCc0SOi/sq',
    nome: 'Imma',
    username: 'ImmaFetaiol',
    eta: 26,
    id: 3,
    friends: [],
  };
  arrPosts: Posts[] = [];
  userId!: number;
  sub!: Subscription;

  constructor(
    private router: ActivatedRoute,
    private users$: UserService,
    private posts$: PostsService
  ) {}

  ngOnInit(): void {
    this.sub = this.router.params.subscribe((res) => {
      let id = +res['id'];
      this.userId = id;
      this.users$.getSingleUser(id).subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
    });
    this.posts$.getPosts().subscribe((posts) => {
      this.arrPosts = posts;
      this.arrPosts = this.arrPosts.filter((post) => {
        return post.autore == this.userId;
      });
      console.log(this.arrPosts);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
