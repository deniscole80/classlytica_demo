import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStudentDetailsComponent } from './user-student-details.component';

describe('UserStudentDetailsComponent', () => {
  let component: UserStudentDetailsComponent;
  let fixture: ComponentFixture<UserStudentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStudentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
