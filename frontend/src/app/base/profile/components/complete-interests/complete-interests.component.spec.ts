import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteInterestsComponent } from './complete-interests.component';

describe('CompleteInterestsComponent', () => {
  let component: CompleteInterestsComponent;
  let fixture: ComponentFixture<CompleteInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteInterestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
