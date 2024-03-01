import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStudentMediaComponent } from './user-student-media.component';

describe('UserStudentMediaComponent', () => {
  let component: UserStudentMediaComponent;
  let fixture: ComponentFixture<UserStudentMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStudentMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStudentMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
