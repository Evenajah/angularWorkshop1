import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../service/department.service';
import { Employee } from '../interface/table';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-table-employee',
  templateUrl: './table-employee.component.html',
  styleUrls: ['./table-employee.component.css']
})
export class TableEmployeeComponent implements OnInit {
  valueList: Employee[];
  constructor(
    private serviceTable: DepartmentService, 
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
  }


  ngOnInit() {
    this.search();

  }


  search(condition = {}) {
    this.serviceTable
      .searchTableWithCondition(condition)
      .subscribe(response => {
        console.log(response);
        this.valueList = response;
      });
  }

  confirmDel(condition: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.serviceTable.deleteEmployee(condition).subscribe(_ => {
          console.log('delete success');
          // Toast
          this.messageService.add({
            key: 'toastDel',
            severity: 'success',
            summary: 'Service Message',
            detail: 'Via MessageService'
          });
          
         this.search();
        });
      }
    });
  }
}
