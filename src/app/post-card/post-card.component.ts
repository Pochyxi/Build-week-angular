import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Comments } from '../comments';
import { Posts } from '../posts';
import { PostsService } from '../posts.service';
import { UserService } from '../user.service';
import { User } from '../users';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() p!: Posts;
  isLogged!: boolean;
  sub!: Subscription;

  arrayUsers: User[] = [];

  form!: FormGroup;

  modifyFlag: boolean = false;
  likeFlag: boolean = false;

  deletePressed: boolean = false;

  id: any = localStorage.getItem('id');

  userName: string | undefined;

  commentiFlag = false;

  @Output() shotId = new EventEmitter<Posts>();
  @Output() shotobj = new EventEmitter<Posts>();

  constructor(
    private post$: PostsService,
    public fb: FormBuilder,
    private auth$: AuthService,
    private users$: UserService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.sub = this.auth$.authObs.subscribe((res) => {
      res ? (this.isLogged = true) : (this.isLogged = false);
    });
    console.log(this.p);
    this.users$.getUsers().subscribe((users) => {
      this.arrayUsers = users;
    });
    if (this.p.likes.find((u) => u.id == this.p.likes[0].id)) {
      this.likeFlag = true;
    }
  }
  delete() {
    this.shotId.emit(this.p);
  }
  getFormControl(name: string) {
    return this.form.get(name);
  }
  modify() {
    let obj: any = {
      title: this.getFormControl('title')?.value,
      body: this.getFormControl('body')?.value,
    };
    this.shotobj.emit(obj);
    this.modifyFlag = !this.modifyFlag;
  }
  openForm() {
    this.modifyFlag = !this.modifyFlag;
    this.form.setValue({
      title: this.p.title,
      body: this.p.body, // POPI POPI STAI LAGGANDO BRO
    });
  }
  like() {
    if (!this.likeFlag) {
      this.likeFlag = !this.likeFlag;
      console.log(this.likeFlag);
      let obj: any = this.arrayUsers.find((u) => u.id == this.id);
      this.p.likes.push(obj);
      this.post$.modifyPost(this.p).subscribe((res) => {
        this.p = res;
      });
    } else {
      this.likeFlag = !this.likeFlag;
      this.p.likes = this.p.likes.filter((u) => u.id != this.p.likes[0].id);
      this.post$.modifyPost(this.p).subscribe((res) => {
        this.p = res;
      });
    }

    console.log(this.p.likes);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
