import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  AfterViewInit
} from '@angular/core';
import { SelectItem } from '../interface/selectDepartment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from '../service/department.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit, AfterViewInit {
  @Output() changeEvent = new EventEmitter();
  @Input() mode = 'insert';
  // Generated by https://quicktype.io

  selectDepartment: SelectItem[];
  selectJob: SelectItem[];
  selectTitle: SelectItem[];
  rememberData: any;
  skillRecieve: any;
  displaySkill: boolean;
  displaySkillAdd: boolean;
  display500: boolean;
  // formGroup
  insertForm = new FormGroup({
    department: new FormControl(null, [Validators.required]),
    jobTitle: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),

    firstName: new FormControl(null, [
      Validators.maxLength(50),
      Validators.required
    ]),
    lastName: new FormControl(null, [
      Validators.maxLength(50),
      Validators.required
    ]),
    address: new FormControl(null, [
      Validators.required,
      Validators.maxLength(200)
    ])
  });

  skillForm = new FormGroup({
    skillId: new FormControl(null),
    skillDesc: new FormControl(null),
    skillName: new FormControl(null)
  });

  constructor(
    private serviceDepartment: DepartmentService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    // this.rememberData = this.insertForm.getRawValue();
    // console.log('getRaw', this.insertForm.getRawValue());
  }

  ngOnInit() {
    this.searchDepartmentItem();
    this.searchJobtitleItem();

    if (this.mode === 'edit') {
      this.settingEditMode();
    }
  }

  settingEditMode() {
    this.serviceDepartment
      .searchEmployeeItem(this.route.snapshot.params.employeeId)
      .subscribe(
        response => {
          console.log('response', response);
          this.skillRecieve = response.skills;
          console.log(this.skillRecieve);
          this.insertForm.patchValue(response);
          this.rememberData = this.insertForm.getRawValue();

          console.log(response.department.departmentCode);
          this.selectJob = this.selectJob.filter(
            entity =>
              entity.value.jobTitleCode !== response.jobTitle.jobTitleCode &&
              entity.value.jobTitleCode !== null
          );

          this.selectJob = [
            {
              value: response.jobTitle.jobTitleCode,
              label: response.jobTitle.jobTitleName
            },
            ...this.selectJob
          ];

          this.selectDepartment = this.selectDepartment.filter(
            entity =>
              entity.value.departmentCode !==
                response.department.departmentCode &&
              entity.value.departmentCode !== null
          );

          this.selectDepartment = [
            {
              value: response.department.departmentCode,
              label: response.department.departmentName
            },
            ...this.selectDepartment
          ];

          this.changeTitleName(response.gender);
        },
        err => {
          if (err.status === 500) {
            this.display500 = true;
          }
        }
      );
  }

  returnStatus500() {
    this.router.navigateByUrl('/employee/employee/search');
  }

  searchDepartmentItem(condition = {}) {
    this.serviceDepartment
      .searchDepartmentItem(condition)
      .subscribe(response => {
        this.selectDepartment = response.map(item => {
          return {
            label: item.departmentName,
            value: { departmentCode: item.departmentCode }
          };
        });
        this.selectDepartment = [
          { value: { departmentCode: null }, label: 'Select Department' },
          ...this.selectDepartment
        ];
        // console.log(response);
      });
  }

  searchJobtitleItem(condition = {}) {
    this.serviceDepartment.searchJobItem(condition).subscribe(response => {
      this.selectJob = response.map(item => {
        return {
          label: item.jobTitleName,
          value: { jobTitleCode: item.jobTitleCode }
        };
      });
      this.selectJob = [
        { value: { jobTitleCode: null }, label: 'Select job title' },
        ...this.selectJob
      ];
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
    if (this.mode === 'edit') {
      this.insertForm.reset(this.rememberData);
    } else {
      this.insertForm.reset();
    }
  }

  changeTitleName(valueGender: any) {
    if (valueGender == 'M') {
      this.selectTitle = [{ label: 'MR', value: 'MR' }];
      this.insertForm.controls.title.setValue(this.selectTitle[0].value);
    } else {
      this.selectTitle = [
        { label: 'MISS', value: 'MISS' },
        { label: 'MRS', value: 'MRS' }
      ];
      this.insertForm.controls.title.setValue(this.selectTitle[0].value);
    }
    // console.log(event);
  }

  insertClicking() {
    console.log(this.insertForm.getRawValue());
    if (this.insertForm.valid) {
      this.serviceDepartment
        .insertDatawithForm(this.insertForm.getRawValue())
        .subscribe(response => {
          this.clearText();

          this.messageService.add({
            key: 'toastAdd',
            severity: 'success',
            summary: 'Service Message',
            detail: 'Via MessageService'
          });
        });
    } else {
      Object.values(this.insertForm.controls).forEach(dirty =>
        dirty.markAsDirty()
      );
    }
  }

  updateClicking() {
    console.log(this.insertForm.getRawValue());

    const newObject = {
      ...this.insertForm.getRawValue(),
      employeeId: this.route.snapshot.params.employeeId
    };

    if (this.insertForm.valid) {
      this.serviceDepartment.updateEmployee(newObject).subscribe(response => {
        console.log(response);
        this.messageService.add({
          key: 'toastEdit',
          severity: 'success',
          summary: 'Service Message',
          detail: 'Via MessageService'
        });
      });
    } else {
      Object.values(this.insertForm.controls).forEach(dirty =>
        dirty.markAsDirty()
      );
    }
  }

  onSkillRowSelect(event: any) {
    console.log(event);
    this.displaySkill = true;
    this.skillForm.patchValue(event.data);
  }

  onSkillAdd(event: any) {
    console.log(event);
    this.displaySkillAdd = true;
  }

  addSkill() {
    if (this.skillForm.valid) {
      const skillValue = this.skillForm.getRawValue();
      const Skill: any = {
        employee: { employeeId: this.route.snapshot.params.employeeId },
        skillId: skillValue.skillId,
        skillDesc: skillValue.skillDesc,
        skillName: skillValue.skillName
      };

      this.serviceDepartment.addSkill(Skill).subscribe(response => {
        console.log(response);
        this.displaySkillAdd = false;
        this.messageService.add({
          key: 'toastAdd',
          severity: 'success',
          summary: 'Service Message',
          detail: 'Via MessageService'
        });
        this.onHideDialog();
        this.ngOnInit();
      });
    }
  }

  onHideDialog() {
    this.skillForm.reset();
  }

  editSkill(event: any) {
    if (this.skillForm.valid) {
      const skillValue = this.skillForm.getRawValue();
      const Skill: any = {
        employee: { employeeId: this.route.snapshot.params.employeeId },
        skillId: skillValue.skillId,
        skillDesc: skillValue.skillDesc,
        skillName: skillValue.skillName
      };

      console.log('valueSkill', Skill);

      this.serviceDepartment.editSkill(Skill).subscribe(response => {
        this.displaySkill = false;
        this.messageService.add({
          key: 'toastEdit',
          severity: 'success',
          summary: 'Service Message',
          detail: 'Via MessageService'
        });

        console.log(response);
      });
      this.ngOnInit();
    }
  }

  delSkill(event: any) {
    const skillValue = this.skillForm.getRawValue();

    this.serviceDepartment.delSkill(skillValue.skillId).subscribe(response => {
      console.log(response);
      this.displaySkill = false;
      this.messageService.add({
        key: 'toastDel',
        severity: 'success',
        summary: 'Service Message',
        detail: 'Via MessageService'
      });

      console.log(response);
      this.ngOnInit();
    });
  }
}
