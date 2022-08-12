import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { PostCardComponent } from './post-card/post-card.component';
import { FooterComponent } from './footer/footer.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { ProfileComponent } from './profile/profile.component';
import { DettagliComponent } from './dettagli/dettagli.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentComponent } from './comment/comment.component';
import { PuntiniPipe } from './puntini.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import { SingleUserPageComponent } from './single-user-page/single-user-page.component';
import { FollowedPostsComponent } from './followed-posts/followed-posts.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TrendsComponent } from './trends/trends.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PostCardComponent,
    FooterComponent,
    MyPostsComponent,
    ProfileComponent,
    DettagliComponent,
    LoginComponent,
    SignupComponent,
    CommentComponent,
    PuntiniPipe,
    DialogComponent,
    SingleUserPageComponent,
    FollowedPostsComponent,
    TrendsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CdkAccordionModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    CdkTableModule,
    MatSelectModule,
    MatSidenavModule,
    MatStepperModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatBadgeModule,
    ScrollingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
    {
      provide: MAT_DIALOG_DATA,
      useClass: DialogComponent,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
