import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationLikeComponent } from './notification-like.component';

describe('NotificationLikeComponent', () => {
  let component: NotificationLikeComponent;
  let fixture: ComponentFixture<NotificationLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
