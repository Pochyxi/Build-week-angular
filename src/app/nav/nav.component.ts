import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthUser } from '../users';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isLogged!: boolean;

  sub!: Subscription;

  constructor(private auth$: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.auth$.authObs.subscribe((res) => {
      res ? (this.isLogged = true) : (this.isLogged = false);
    });
  }
  logout(): void {
    this.auth$.logout();
    this.router.navigate(['/login']);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
