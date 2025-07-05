import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryManagementComponent } from './repository-management.component';

describe('RepositoryManagementComponent', () => {
  let component: RepositoryManagementComponent;
  let fixture: ComponentFixture<RepositoryManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoryManagementComponent]
    });
    fixture = TestBed.createComponent(RepositoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
