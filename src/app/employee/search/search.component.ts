import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { SelectItem } from "../interface/selectDepartment";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DepartmentService } from "../service/department.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  @Output() changeEvent = new EventEmitter();
  selectDepartment: SelectItem[];
  selectJob: SelectItem[];

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

  constructor(private serviceDepartment: DepartmentService) {
    this.selectDepartment = [];
    this.selectJob = [];
  }

  ngOnInit() {
    this.searchDepartmentItem();
    this.searchJobtitleItem();
  }

  searchDepartmentItem(condition = {}) {
    this.serviceDepartment
      .searchDepartmentItem(condition)
      .subscribe(response => {
        this.selectDepartment = response.map(item => {
          return { label: item.departmentName, value: item.departmentCode };
        });
        // console.log(response);
      });
  }

  searchJobtitleItem(condition = {}) {
    this.serviceDepartment.searchJobItem(condition).subscribe(response => {
      this.selectJob = response.map(item => {
        return { label: item.jobTitleName, value: item.jobTitleCode };
      });
    });
    console.log(this.selectJob);
  }

  emitItem(event: any) {
    if (this.employeeForm.valid) {
      this.changeEvent.emit(this.employeeForm.getRawValue());
    } else {
      Object.values(this.employeeForm.controls).forEach(dirty =>
        dirty.markAsDirty()
      );
    }

  }
}
