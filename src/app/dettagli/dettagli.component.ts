import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Posts } from '../posts';
import { PostsService } from '../posts.service';
import { UserService } from '../user.service';
import { User } from '../users';

@Component({
  selector: 'app-dettagli',
  templateUrl: './dettagli.component.html',
  styleUrls: ['./dettagli.component.scss'],
})
export class DettagliComponent implements OnInit {
  p: Posts = {
    id: 2,
    autore: 1,
    autorname: 'BUDKASPLIT()',
    title: '123',
    body: '11111111111',
    likes: [
      {
        email: 'immolettina@gmail.com',
        password:
          '$2a$10$5gdq8smkTJKpHiHhY6PXzegp4QjQB9Y2CGvPWtEn1FBGCc0SOi/sq',
        nome: 'Imma',
        username: 'ImmaFetaiol',
        eta: 26,
        id: 3,
        friends: [],
      },
      {
        email: 'marcopolonerd@gmail.com',
        password:
          '$2a$10$I6mHXTL9eeTTlQuwbt0jPOlBeqiI9otWrc/.cEttnvCmi6Nqyi.4q',
        nome: '123123',
        username: 'Marco Polo',
        eta: 405,
        id: 2,
        friends: [],
      },
      {
        email: 'budka@budka.budka',
        password:
          '$2a$10$4m3Ycu8PLXrb3Fdz1ZelceS2VsYkqasell3.7stmmmgBZvKxT19Uy',
        nome: 'Budken',
        username: 'BUDKASPLIT()',
        eta: 123,
        id: 1,
        friends: [],
      },
    ],
    comments: [
      {
        id: 11,
        idPost: 2,
        idUser: 3,
        body: 'ciao budka!!',
        authorname: 'ImmaFetaiol',
      },
      {
        id: 12,
        idPost: 2,
        idUser: 2,
        body: 'ciao budka!!!',
        authorname: 'Marco Polo',
      },
      {
        id: 13,
        idPost: 2,
        idUser: 1,
        body: 'Non ha senso creare un post e scrivere 11111 scusa!',
        authorname: 'BUDKASPLIT()',
      },
    ],
  };

  @Input() i: any;

  sub!: Subscription;

  isLogged!: boolean;

  ownedPost: boolean = false;

  arrayUsers: User[] = [];
  likesArray: User[] = [];

  form!: FormGroup;

  modifyFlag: boolean = false;
  likeFlag: boolean = false;

  colorHeart = 'black';

  deletePressed: boolean = false;

  id: any = localStorage.getItem('id');

  userName: string | undefined;

  commentiFlag = true;
  showLikes = false;

  constructor(
    private post$: PostsService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private users$: UserService,
    private auth$: AuthService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.sub = this.router.params.subscribe((res) => {
      let id = +res['id'];

      this.post$.getSinglePost(id).subscribe((res) => {
        this.p = res;
        if (this.p.autore == this.id) {
          this.ownedPost = true;
        }
        if (this.p.likes.find((u: { id: any }) => u.id == this.id)) {
          this.likeFlag = true;
          this.colorHeart = 'warn';
          this.likesArray = this.p.likes;
          console.log(this.p.likes);
        }
        console.log(res);
      });
    });

    this.users$.getUsers().subscribe((users) => {
      this.arrayUsers = users;
    });

    this.sub = this.auth$.authObs.subscribe((res) => {
      res ? (this.isLogged = true) : (this.isLogged = false);
    });
  }
  delete() {}
  getFormControl(name: string) {
    return this.form.get(name);
  }
  modify() {
    let obj: any = {
      title: this.getFormControl('title')?.value,
      body: this.getFormControl('body')?.value,
    };

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
      this.p.likes = this.p.likes.filter((u: { id: any }) => u.id != this.id);
      this.post$.putPost(this.p).subscribe((res) => {
        this.p = res;
      });
    }

    console.log(this.p.likes);
  }
  shotPostId() {
    this.post$.setPostId(this.id);
  }
}
