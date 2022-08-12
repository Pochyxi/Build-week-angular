import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../users';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  modify: boolean = false;
  deleteFlag: boolean = false;
  myProfile: any = '';

  userId: string | null | number = localStorage.getItem('id');

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  constructor(
    private user$: UserService,
    private fb: FormBuilder,
    private router: Router,
    private auth$: AuthService
  ) {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.user$.getUsers().subscribe((user) => {
      this.myProfile = user.find((u) => u.id == this.userId);
      console.log(this.myProfile);
    });
  }

  getFirstControl(name: string) {
    return this.firstFormGroup.get(name);
  }
  getSecondControl(name: string) {
    return this.secondFormGroup.get(name);
  }

  modifyPost() {
    let obj = {
      email: this.getSecondControl('secondCtrl')?.value,
      nome: this.getFirstControl('firstCtrl')?.value,
      id: this.userId,
    };
    console.log(obj);
    this.user$.modifyUsers(obj).subscribe((user) => {
      this.myProfile = user;
    });
  }

  deleteUser() {
    let id = localStorage.getItem('id');
    this.user$.deleteUsers(id).subscribe(() => {
      this.auth$.logout();
      this.router.navigate(['/signup']);
    });
  }
}
