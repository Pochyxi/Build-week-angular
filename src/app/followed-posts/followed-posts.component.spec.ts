import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedPostsComponent } from './followed-posts.component';

describe('FollowedPostsComponent', () => {
  let component: FollowedPostsComponent;
  let fixture: ComponentFixture<FollowedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowedPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
