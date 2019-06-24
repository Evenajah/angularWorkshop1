import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild
} from '@angular/core';
import { SelectItem } from '../interface/selectDepartment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from '../service/department.service';
import { TableEmployeeComponent } from '../table-employee/table-employee.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() changeEvent = new EventEmitter();
  @Input() mode = 'search';
  @Output() clearTable = new EventEmitter();

  selectDepartment: SelectItem[];
  selectJob: SelectItem[];
  displayUser: boolean;
  userData: any;
  // formGroup
  employeeForm = new FormGroup({
    departmentCode: new FormControl(null),
    jobTitleCode: new FormControl(null, [
      // Validators.required,
      Validators.minLength(2)
    ]),
    jobType: new FormControl(null),
    firstName: new FormControl(null, [Validators.maxLength(50)]),
    lastName: new FormControl(null, [Validators.maxLength(50)]),
    gender: new FormControl(null)
  });

  constructor(
    private serviceDepartment: DepartmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchDepartmentItem();
    this.searchJobtitleItem();

    this.serviceDepartment.getUser().subscribe(response => {
      if (response === null) {
        this.router.navigateByUrl('/employee/employee');
      } else {
        this.userData = response;
      }
    });
  }

  searchDepartmentItem(condition = {}) {
    this.serviceDepartment
      .searchDepartmentItem(condition)
      .subscribe(response => {
        this.selectDepartment = response.map(item => {
          return { label: item.departmentName, value: item.departmentCode };
        });
        this.selectDepartment = [
          { value: null, label: 'Select Department' },
          ...this.selectDepartment
        ];
        // console.log(response);
      });
  }

  showUser() {
    this.displayUser = true;
  }

  searchJobtitleItem(condition = {}) {
    this.serviceDepartment.searchJobItem(condition).subscribe(response => {
      this.selectJob = response.map(item => {
        return { label: item.jobTitleName, value: item.jobTitleCode };
      });
      this.selectJob = [
        { value: null, label: 'Select job title' },
        ...this.selectJob
      ];
    });
    // console.log(this.selectJob);
  }

  emitItem(event: any) {
    if (this.employeeForm.valid) {
      this.changeEvent.emit(this.employeeForm.getRawValue());
      console.log(this.employeeForm.getRawValue());
    } else {
      Object.values(this.employeeForm.controls).forEach(dirty =>
        dirty.markAsDirty()
      );
    }
  }

  clearText() {
    this.employeeForm.reset();
    this.clearTable.emit();
  }
}
