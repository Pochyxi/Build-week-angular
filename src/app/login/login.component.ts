import { HttpBackend, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  hide = true;
  errorFlag = false;

  constructor(
    private auth$: AuthService,
    public fb: FormBuilder,
    private user$: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  login() {
    if (!this.form.valid) {
      console.log('not valid');
    } else {
      this.auth$.login(this.form.value).subscribe(
        (res) => {
          console.log('login OK');
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('id', res.user.id.toString());

          this.auth$.authSub.next(res.user);
          this.router.navigate(['/']);
        },
        (err) => {
          this.errorFlag = true;
          this.openDialog();
        }
      );
      console.log(this.form.value);
    }
  }
  getFormControl(name: string) {
    return this.form.get(name);
  }
  getErrorMessage(param: string) {
    if (this.getFormControl(param)?.hasError('required')) {
      return 'Questo campo deve essere compilato';
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
  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        error: 'login',
      },
    });
  }
}
