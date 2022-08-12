import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Posts } from '../posts';
import { PostsService } from '../posts.service';
import { UserService } from '../user.service';
import { User } from '../users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Posts[] = [];
  arrayUsers: User[] = [];

  logged!: boolean;

  confirm: boolean = false;
  formFlag: boolean = false;

  form!: FormGroup;

  constructor(
    private auth$: AuthService,
    private posts$: PostsService,
    public fb: FormBuilder,
    private users$: UserService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.posts$.getPosts().subscribe((post) => {
      this.posts = post;
      this.logged = this.auth$.isLogged();
    });
    this.users$.getUsers().subscribe((users) => {
      this.arrayUsers = users;
    });
  }

  getFormControl(name: string) {
    return this.form.get(name);
  }

  addPost() {
    let aut: any = localStorage.getItem('id');
    let lastId = 0;
    for (const p of this.posts) {
      if (p.id > lastId) {
        lastId = p.id;
      }
    }
    let obj: any = {
      id: lastId + 1,
      autore: parseInt(aut),
      autorname: this.arrayUsers.find((u) => u.id == aut)?.username,
      title: this.getFormControl('title')?.value,
      body: this.getFormControl('body')?.value,
      likes: [],
      comments: [],
    };
    if (this.getFormControl('body')?.value.length > 1) {
      if (this.form.valid) {
        this.posts$.newPost(obj);
      } else {
        console.log('form validation failed');
      }

      this.form.setValue({
        title: '',
        body: '',
      });
      this.posts$.newPost(obj).subscribe(() => {
        this.posts.push(obj);
        this.formFlag = false;
      });
    }
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
