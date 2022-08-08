import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse, AuthUser, UserLogin, UserSignup } from './users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/';

  logged = false;

  authSub = new BehaviorSubject<false | AuthUser>(false);
  authObs = this.authSub.asObservable();

  constructor(private http: HttpClient) {
    this.authObs.subscribe((res) => {
      this.logged = res ? true : false;
    });
  }

  signUp(user: UserSignup) {
    this.http.post<AuthResponse>(this.url + 'signup', user).subscribe((res) => {
      console.log('signup OK');
      localStorage.setItem('token', res.accessToken);
      localStorage.setItem('id', res.user.id.toString());
      this.authSub.next(res.user);
    });
  }

  login(user: UserLogin) {
    this.http.post<AuthResponse>(this.url + 'login', user).subscribe((res) => {
      console.log('login OK');
      localStorage.setItem('token', res.accessToken);
      localStorage.setItem('id', res.user.id.toString());
      this.authSub.next(res.user);
    });
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
