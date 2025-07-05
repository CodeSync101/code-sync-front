import { TestBed } from '@angular/core/testing';

import { FieldManagerDashboardService } from './field-manager-dashboard.service';

describe('FieldManagerDashboardService', () => {
  let service: FieldManagerDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldManagerDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
