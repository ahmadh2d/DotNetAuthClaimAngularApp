import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyUsersManagementComponent } from './only-users-management.component';

describe('OnlyUsersManagementComponent', () => {
  let component: OnlyUsersManagementComponent;
  let fixture: ComponentFixture<OnlyUsersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlyUsersManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlyUsersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
