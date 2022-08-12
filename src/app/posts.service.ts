import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Posts } from './posts';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  url = 'http://localhost:3000/posts/';

  postId = 0;

  sub = new Subject<Posts[]>();
  obs = this.sub.asObservable();

  subId = new Subject<number>();
  obsId = this.subId.asObservable();

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Posts[]>(this.url);
  }

  newPost(object: any) {
    return this.http.post<Posts>(this.url, object);
  }

  deletePost(id: number) {
    return this.http.delete<Posts>(this.url + id);
  }

  modifyPost(obj: Posts) {
    return this.http.patch<Posts>(this.url + obj.id, obj);
  }
  putPost(obj: Posts) {
    return this.http.put<Posts>(this.url + obj.id, obj);
  }
  getSinglePost(id: number) {
    return this.http.get<Posts>(this.url + id);
  }
  setPostId(id: number) {
    this.postId = id;
    this.subId.next(this.postId);
  }
}
