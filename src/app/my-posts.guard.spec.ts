import { TestBed } from '@angular/core/testing';

import { MyPostsGuard } from './my-posts.guard';

describe('MyPostsGuard', () => {
  let guard: MyPostsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MyPostsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
