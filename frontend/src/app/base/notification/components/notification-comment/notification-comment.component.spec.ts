import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCommentComponent } from './notification-comment.component';

describe('NotificationCommentComponent', () => {
  let component: NotificationCommentComponent;
  let fixture: ComponentFixture<NotificationCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
