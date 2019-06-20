import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../service/department.service';
import { Employee } from '../interface/table';

@Component({
  selector: 'app-table-employee',
  templateUrl: './table-employee.component.html',
  styleUrls: ['./table-employee.component.css']
})
export class TableEmployeeComponent implements OnInit {
  valueList: Employee[];
  constructor(private serviceTable: DepartmentService) {}


  ngOnInit() {

    
  }

  
  search(condition = {}) {
    this.serviceTable
      .searchWithCondition(condition)
      .subscribe(response => {
        console.log(response);
        this.valueList = response;
      });
  }
}
