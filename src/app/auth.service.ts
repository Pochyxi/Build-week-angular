import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError } from 'rxjs';
import { AuthResponse, AuthUser, UserLogin, UserSignup } from './users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/';

  logged = false;

  authSub = new BehaviorSubject<boolean | AuthUser>(this.isLogged());
  authObs = this.authSub.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.authObs.subscribe((res) => {
      this.logged = res ? true : false;
    });
  }

  signUp(user: UserSignup) {
    return this.http.post<AuthResponse>(this.url + 'signup', user);
  }

  login(user: UserLogin) {
    return this.http.post<AuthResponse>(this.url + 'login', user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.authSub.next(false);
  }

  isLogged(): boolean {
    let t = localStorage.getItem('token');
    if (t) {
      return true;
    } else {
      return false;
    }
  }
}
