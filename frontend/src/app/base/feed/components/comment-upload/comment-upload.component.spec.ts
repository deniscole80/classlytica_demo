import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentUploadComponent } from './comment-upload.component';

describe('CommentUploadComponent', () => {
  let component: CommentUploadComponent;
  let fixture: ComponentFixture<CommentUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
