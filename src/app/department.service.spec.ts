import { TestBed } from '@angular/core/testing';
import { DepartmentService } from './employee/service/department.service';



describe('DepartmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartmentService = TestBed.get(DepartmentService);
    expect(service).toBeTruthy();
  });
});
