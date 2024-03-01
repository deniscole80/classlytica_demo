import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarWhiteComponent } from './sidebar-white.component';

describe('SidebarWhiteComponent', () => {
  let component: SidebarWhiteComponent;
  let fixture: ComponentFixture<SidebarWhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarWhiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarWhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
