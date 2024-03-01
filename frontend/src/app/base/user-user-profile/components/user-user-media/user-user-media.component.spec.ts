import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUserMediaComponent } from './user-user-media.component';

describe('UserUserMediaComponent', () => {
  let component: UserUserMediaComponent;
  let fixture: ComponentFixture<UserUserMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUserMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUserMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
