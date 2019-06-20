import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { SelectItem } from "../interface/selectDepartment";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DepartmentService } from "../service/department.service";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

  @Output() changeEvent = new EventEmitter();
  @Input() mode = 'search';


  selectDepartment: SelectItem[];
  selectJob: SelectItem[];
  selectTitle: SelectItem[];

  // formGroup
  insertForm = new FormGroup({
    department: new FormControl(null, [Validators.required]),
    jobTitle: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    title:new FormControl(null, [Validators.required]),

    firstName: new FormControl(null, [Validators.maxLength(50),Validators.required]),
    lastName: new FormControl(null, [Validators.maxLength(50),Validators.required]),
    address: new FormControl(null, [Validators.required]),
  });

  constructor(private serviceDepartment: DepartmentService, private messageService: MessageService) {

  }

  ngOnInit() {
    this.searchDepartmentItem();
    this.searchJobtitleItem();
    console.log(this.insertForm.getRawValue());
  }

  searchDepartmentItem(condition = {}) {
    this.serviceDepartment
      .searchDepartmentItem(condition)
      .subscribe(response => {
        this.selectDepartment = response.map(item => {
          return { label: item.departmentName, value: { departmentCode: item.departmentCode } };
        });
        this.selectDepartment = [{ value: null, label: 'Select Department' }, ...this.selectDepartment];
        // console.log(response);
      });
  }

  searchJobtitleItem(condition = {}) {
    this.serviceDepartment.searchJobItem(condition).subscribe(response => {
      this.selectJob = response.map(item => {
        return { label: item.jobTitleName, value: { jobTitleCode: item.jobTitleCode } };
      });
      this.selectJob = [{ value: null, label: 'Select job title' }, ...this.selectJob];
    });
    // console.log(this.selectJob);
  }

  emitItem(event: any) {
    if (this.insertForm.valid) {
      this.changeEvent.emit(this.insertForm.getRawValue());
      console.log(this.insertForm.getRawValue());
    } else {
      Object.values(this.insertForm.controls).forEach(dirty =>
        dirty.markAsDirty()
      );
    }

  }

  clearText() {
    this.insertForm.reset();
  }

  changeTitleName(valueGender: any) {
    if (valueGender == "M") {
      this.selectTitle = [{ label: "MR", value: "MR" }];
      this.insertForm.controls.title.setValue(this.selectTitle[0].value)
    } else {
      this.selectTitle = [
        { label: "MISS", value: "MISS" },
        { label: "MRS", value: "MRS" },
      ];
      this.insertForm.controls.title.setValue(this.selectTitle[0].value)
    }
    // console.log(event);
  }

  insertClicking() {
    console.log(this.insertForm.getRawValue());
    if (this.insertForm.valid) {
      this.serviceDepartment.insertDatawithForm(this.insertForm.getRawValue()).subscribe(response => {

        this.clearText();

        this.messageService.add({
          key: 'toastAdd',
          severity: 'success',
          summary: 'Service Message',
          detail: 'Via MessageService'
        });
      }


      )
    } else {
      Object.values(this.insertForm.controls).forEach(dirty =>
        dirty.markAsDirty()
      );
    }
  }
}
