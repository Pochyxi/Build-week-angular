import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { FriendRequestService } from '../friend-request.service';
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
  ownedPost: boolean = false;
  modifyFlag: boolean = false;
  likeFlag: boolean = false;

  sub!: Subscription;

  arrayUsers: User[] = [];
  likesArray: User[] = [];
  postOwner!: User;

  form!: FormGroup;

  colorHeart = 'black';

  deletePressed: boolean = false;

  id: any = localStorage.getItem('id');

  userName: string | undefined;

  commentiFlag = false;
  showLikes = false;

  showAddMenu = false;
  hidden: boolean = false;
  author!: User;

  friendsArray: User[] = [];

  @Output() shotId = new EventEmitter<Posts>();
  @Output() shotobj = new EventEmitter<Posts>();

  constructor(
    private post$: PostsService,
    public fb: FormBuilder,
    private auth$: AuthService,
    private users$: UserService,
    private friend$: FriendRequestService,
    private http: HttpClient
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
    this.users$.getUsers().subscribe((users) => {
      this.arrayUsers = users;
      this.author = this.arrayUsers.find((user) => user.id == this.p.autore)!;
      let arrSingleUser = this.arrayUsers.filter(
        (user) => user.id == this.p.autore
      );
      this.postOwner = arrSingleUser[0];
    });
    if (this.p.likes.find((u) => u.id == this.id)) {
      this.likeFlag = true;
      this.colorHeart = 'warn';
      this.likesArray = this.p.likes;
    }
    if (this.p.autore == this.id) {
      this.ownedPost = true;
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
      this.colorHeart = 'warn';
      console.log(this.likeFlag);

      let obj: any = this.arrayUsers.find((u) => u.id == this.id);
      this.p.likes.push(obj);

      this.post$.putPost(this.p).subscribe((res) => {
        this.p = res;
      });
    } else {
      this.likeFlag = !this.likeFlag;
      this.colorHeart = 'black';
      this.p.likes = this.p.likes.filter((u) => u.id != this.id);
      this.post$.putPost(this.p).subscribe((res) => {
        this.p = res;
      });
    }
  }
  shotPostId() {
    this.post$.setPostId(this.id);
  }

  addFriend() {
    this.friend$.sendRequest().subscribe((res) => {
      let richiedente = res.find((u) => u.id == this.id);
      console.log('richiedente: ', richiedente);

      let ricevente = res.find((u) => u.id == this.p.autore);
      console.log('ricevente: ', ricevente);
      this.friendsArray = richiedente!.friends;
      let notFriend = true;
      for (const f of this.friendsArray) {
        if (f.id == richiedente!.id) {
          notFriend = false;
        }
      }
      if (notFriend) {
        this.friendsArray.push(ricevente!);
        console.log('this.friendsArray: ' + this.friendsArray);
        console.log(this.friendsArray);
        this.http
          .patch(`http://localhost:3000/users/${richiedente!.id}`, {
            friends: this.friendsArray,
          })
          .subscribe((res) => {
            console.log('Friend request sended correctly', res);
          });
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
