import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Posts } from './posts';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  url = 'http://localhost:3000/posts/';

  arrayPosts: Posts[] = [];

  sub = new Subject<Posts[]>();
  obs = this.sub.asObservable();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<Posts[]>(this.url).subscribe((posts) => {
      this.arrayPosts = posts;
      this.sub.next(this.arrayPosts);
    });
  }
  newPost(object: any) {
    this.http.post<Posts>(this.url, object).subscribe(() => {
      this.arrayPosts.push(object);
    });
  }

  deletePost(id: number) {
    this.http.delete<Posts>(this.url + id).subscribe(() => {
      this.arrayPosts = this.arrayPosts.filter((post) => post.id != id);
    });
  }
}
