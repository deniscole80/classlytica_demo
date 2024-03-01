import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSchoolComponent } from './sign-up-school.component';

describe('SignUpSchoolComponent', () => {
  let component: SignUpSchoolComponent;
  let fixture: ComponentFixture<SignUpSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
