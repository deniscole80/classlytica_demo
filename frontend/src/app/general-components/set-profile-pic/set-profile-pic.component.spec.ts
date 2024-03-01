import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetProfilePicComponent } from './set-profile-pic.component';

describe('SetProfilePicComponent', () => {
  let component: SetProfilePicComponent;
  let fixture: ComponentFixture<SetProfilePicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetProfilePicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetProfilePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
