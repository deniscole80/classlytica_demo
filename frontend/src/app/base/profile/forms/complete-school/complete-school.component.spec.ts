import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteSchoolComponent } from './complete-school.component';

describe('CompleteSchoolComponent', () => {
  let component: CompleteSchoolComponent;
  let fixture: ComponentFixture<CompleteSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
