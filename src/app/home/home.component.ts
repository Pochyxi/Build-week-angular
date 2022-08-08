import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Posts } from '../posts';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Posts[] = [];

  form!: FormGroup;

  sub!: Subscription;

  val: string = '';

  constructor(
    private auth$: AuthService,
    private posts$: PostsService,
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.posts$.getPosts();
    this.sub = this.posts$.obs.subscribe((res) => {
      this.posts = res;
      console.log(this.posts);
    });
  }

  getFormControl(name: string) {
    return this.form.get(name);
  }

  addPost() {
    let aut = localStorage.getItem('id');

    let obj = {
      id:
        this.posts.length === 0 ? 1 : this.posts[this.posts.length - 1].id + 1,
      autore: aut,
      title: this.getFormControl('title')?.value,
      body: this.getFormControl('body')?.value,
    };
    if (this.form.valid) {
      this.posts$.newPost(obj);
    } else {
      console.log('form validation failed');
    }

    this.form.setValue({
      title: '',
      body: '',
    });
  }
  deletePost(id: number) {
    this.posts = this.posts.filter((post) => post.id != id);
    console.log(this.posts);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
