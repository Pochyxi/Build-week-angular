import { Component, OnInit } from '@angular/core';
import { Posts } from '../posts';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss'],
})
export class MyPostsComponent implements OnInit {
  constructor(private post$: PostsService) {}

  myPosts: Posts[] = [];

  ngOnInit(): void {
    this.post$.getPosts().subscribe((res) => {
      let id = localStorage.getItem('id');
      this.myPosts = res.filter((post) => post.autore == id);
    });
  }
  deletePost(obj: Posts) {
    this.post$.deletePost(obj.id).subscribe(() => {
      this.myPosts = this.myPosts.filter((post) => post.id != obj.id);
      console.log(this.myPosts);
    });
  }
  modify(obj: Posts) {
    this.post$.modifyPost(obj).subscribe(() => {
      this.post$.getPosts().subscribe((res) => {
        this.myPosts = res.filter((post) => post.id != obj.id);
      });
    });
  }
}
