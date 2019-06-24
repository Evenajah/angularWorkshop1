import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DepartmentService } from '../service/department.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  displayUser: any;
  userForm = new FormGroup({
    user: new FormControl(null),
    password: new FormControl(null)
  });

  constructor(
    private service: DepartmentService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {}

  onClickLogin() {
    console.log(this.userForm.getRawValue());
    if (this.userForm.valid) {
      this.service.login(this.userForm.getRawValue()).subscribe(
        response => {
          this.service.userId = this.userForm.get('user').value;
          console.log(this.userForm.get('user').value);
          this.router.navigateByUrl('/employee/employee/search');
        },
        err => {
          if (err.status === 400) {
            console.log(err);
            this.messageService.add({
              key: 'toastErr',
              severity: 'error',
              summary: 'error',
              detail: err.error.message
            });
          }
        }
      );
    }
  }
}
