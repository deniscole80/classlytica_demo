import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUserProfileComponent } from './user-user-profile.component';

describe('UserUserProfileComponent', () => {
  let component: UserUserProfileComponent;
  let fixture: ComponentFixture<UserUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUserProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
