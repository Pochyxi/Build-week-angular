import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { UserService } from '../user.service';
import { User, UserSignup } from '../users';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  hide = true;
  spanFlag: boolean = false;

  arrayUsers: User[] = [];

  userCazzi: any = {};

  constructor(
    private auth$: AuthService,
    public fb: FormBuilder,
    private user$: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      username: ['', Validators.required],
      eta: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      conferma: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.user$.getUsers().subscribe((users) => {
      this.arrayUsers = users;
    });
  }

  getFormControl(name: string) {
    return this.form.get(name);
  }

  signup() {
    let userName = this.getFormControl('username')?.value;
    if (!this.form.valid) {
      console.log('not valid');
    } else {
      if (this.arrayUsers.find((user) => user.username == userName)) {
        return this.openDialog('username');
      } else {
        let obj: UserSignup = {
          email: this.getFormControl('email')?.value,
          password: this.getFormControl('password')?.value,
          nome: this.getFormControl('nome')?.value,
          username: this.getFormControl('username')?.value,
          eta: this.getFormControl('eta')?.value,
          friends: [],
        };
        this.auth$.signUp(obj).subscribe(
          (res) => {
            console.log('signup OK');
            localStorage.setItem('token', res.accessToken);
            localStorage.setItem('id', res.user.id.toString());
            this.auth$.authSub.next(res.user);
            this.router.navigate(['/']);
          },
          (err) => {
            this.openDialog('signup');
          }
        );
      }
    }
  }
  getErrorMessage(param: string) {
    if (this.getFormControl(param)?.hasError('required')) {
      return 'Questo campo deve essere compilato';
    }
    return '';
  }
  getPassError() {
    if (this.getFormControl('conferma')?.hasError('required')) {
      return 'Il campo non può essere vuoto';
    }
    return '';
  }
  getEmailError() {
    if (this.getFormControl('email')?.hasError('required')) {
      return 'Questo campo deve essere compilato';
    }
    return this.getFormControl('email')?.hasError('email')
      ? 'Email non valida'
      : '';
  }
  getSpanError() {
    if (
      this.getFormControl('conferma')?.value ===
      this.getFormControl('password')?.value
    ) {
      return '';
    }
    return 'Le password non corrispondono';
  }

  openDialog(param: string) {
    this.dialog.open(DialogComponent, {
      data: {
        error: param,
      },
    });
  }
}
