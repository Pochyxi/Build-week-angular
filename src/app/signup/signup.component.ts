import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;

  constructor(private auth$: AuthService, public fb: FormBuilder) {
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

  ngOnInit(): void {}

  getFormControl(name: string) {
    return this.form.get(name);
  }

  signup() {
    console.log(this.getFormControl('conferma')?.value);
    console.log(this.getFormControl('password')?.value);

    if (
      this.getFormControl('conferma')?.value ===
      this.getFormControl('password')?.value
    ) {
      if (!this.form.valid) {
        console.log('not valid');
      } else {
        this.auth$.signUp(this.form.value);
        console.log(this.form.value);
      }
    } else {
      console.log('Le password non coincidono');
    }
  }
}
