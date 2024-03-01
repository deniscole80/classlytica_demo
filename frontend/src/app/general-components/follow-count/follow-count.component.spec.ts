import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowCountComponent } from './follow-count.component';

describe('FollowCountComponent', () => {
  let component: FollowCountComponent;
  let fixture: ComponentFixture<FollowCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
