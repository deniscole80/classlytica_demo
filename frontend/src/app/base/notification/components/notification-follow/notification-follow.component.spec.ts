import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationFollowComponent } from './notification-follow.component';

describe('NotificationFollowComponent', () => {
  let component: NotificationFollowComponent;
  let fixture: ComponentFixture<NotificationFollowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationFollowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
