import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DettagliComponent } from './dettagli/dettagli.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyPostsGuard } from './my-posts.guard';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'myposts',
    component: MyPostsComponent,
    canActivate: [MyPostsGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [MyPostsGuard],
  },
  {
    path: 'post/:id',
    component: DettagliComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
