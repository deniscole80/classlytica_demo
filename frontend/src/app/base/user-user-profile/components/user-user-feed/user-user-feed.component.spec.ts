import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUserFeedComponent } from './user-user-feed.component';

describe('UserUserFeedComponent', () => {
  let component: UserUserFeedComponent;
  let fixture: ComponentFixture<UserUserFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUserFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUserFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
