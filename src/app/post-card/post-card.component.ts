import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
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

  arrayUsers: User[] = [];

  form!: FormGroup;
  modifyFlag: boolean = false;

  deletePressed: boolean = false;

  id: string | null = localStorage.getItem('id');

  userName: string | undefined;

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

  ngOnInit(): void {}
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
}
