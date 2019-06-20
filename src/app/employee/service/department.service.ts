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

  searchWithCondition(condition = {}){
    return this.http.get<Employee[]>(`/workshop-api/api/employee/queryEmployeeByCondition`, {
      params: condition
    });
  }
}
