import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Comments } from '../comments';
import { Posts } from '../posts';
import { PostsService } from '../posts.service';
import { UserService } from '../user.service';
import { User } from '../users';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;
  @Input() post!: Posts;
  @Input() commentiFlag!: boolean;
  userId: any;
  arrayUsers: User[] = [];
  ownedComments: boolean = false;
  isLog: boolean = false;

  pubblicaFlag = false;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private user$: UserService,
    private post$: PostsService,
    private auth$: AuthService
  ) {
    this.form = this.fb.group({
      body: ['', [Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.isLog = this.auth$.isLogged();
    this.user$.getUsers().subscribe((user) => {
      this.arrayUsers = user;
      console.log(this.arrayUsers);
    });
    this.userId = localStorage.getItem('id');
    console.log(this.post.comments);

    if (this.post.comments.find((comment) => comment.idUser == this.userId)) {
      this.ownedComments = true;
    }
  }
  getFormControl(name: string) {
    return this.form.get(name);
  }
  addComment() {
    let obj: Comments = {
      id:
        this.post.comments.length === 0
          ? 1
          : this.post.comments[this.post.comments.length - 1].id + 1,
      idPost: this.post.id,
      idUser: parseInt(this.userId),
      body: this.getFormControl('body')?.value,
      authorname: this.arrayUsers.find((u) => u.id == this.userId)?.username,
    };

    if (
      this.form.valid &&
      this.getFormControl('body')?.value.toString().length > 0
    ) {
      this.post.comments.push(obj);
      this.post$
        .modifyPost({
          id: this.post.id,
          autore: this.post.autore,
          autorname: this.post.autorname,
          title: this.post.title,
          body: this.post.body,
          likes: this.post.likes,
          comments: this.post.comments,
        })
        .subscribe((res) => {
          console.log(res);
          this.post = res;
          this.form.setValue({
            body: '',
          });
        });
    } else {
      console.log('form not valid');
    }
  }
  deleteComment(index: number) {
    let id = this.post.comments[index].id;
    this.post.comments = this.post.comments.filter(
      (comment) => comment.id != id
    );
    this.post$.modifyPost(this.post).subscribe((res) => {
      console.log(res);
      this.post = res;
    });
  }
  delay() {
    setTimeout(() => {
      this.pubblicaFlag = false;
    }, 1000);
  }
}
