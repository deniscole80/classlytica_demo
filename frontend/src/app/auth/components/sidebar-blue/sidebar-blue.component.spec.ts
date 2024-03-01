import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBlueComponent } from './sidebar-blue.component';

describe('SidebarBlueComponent', () => {
  let component: SidebarBlueComponent;
  let fixture: ComponentFixture<SidebarBlueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarBlueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
