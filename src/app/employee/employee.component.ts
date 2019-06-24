import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from './interface/table';
import { TableEmployeeComponent } from './table-employee/table-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @ViewChild('tableEmployee') table: TableEmployeeComponent;

  constructor() { }

  ngOnInit() {
  }

  protected searchTable(oldObject: Employee){
    const newObject = {};

    //สร้าง new object ดึง key ออกมาแล้ววนลูป เช็ค key ว่า null ไหม และ้ว assign ค่า จาก object เก่า เข้า object ใหม่
    Object.keys(oldObject).forEach(newKeyObject => {
        if (oldObject[newKeyObject] !== null) {
          newObject[newKeyObject] = oldObject[newKeyObject]
      }
    });

    this.table.search(newObject);
  }

  clearTable(){
    this.table.valueList = [];
  }
}
