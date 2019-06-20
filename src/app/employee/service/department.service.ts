import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Employee } from '../interface/table';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  searchDepartmentItem(condition = {}) {
    return this.http.get<any[]>(`/workshop-api/api/department`, {
      params: condition
    });
  }

  searchJobItem(condition = {}){
    return this.http.get<any[]>(`/workshop-api/api/jobTitle`, {
      params: condition
    });
  }

  searchTableWithCondition(condition = {}){
    return this.http.get<Employee[]>(`/workshop-api/api/employee/queryEmployeeByCondition`, {
      params: condition
    });
  }

  insertDatawithForm(data:any){
    return this.http.post(`/workshop-api/api/employee`,data);
  }

  deleteEmployee(employeeId:String){
    return this.http.delete(`/workshop-api/api/employee/${employeeId}`)
  }
}
