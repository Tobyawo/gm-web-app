import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../model/interface/roles';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../model/class/Employee';
import { Constant } from '../constants/Constant';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  // Hardcoded department list
  private departments = [
    {
      deptId: 176,
      deptName: "HR",
      deptHeadName: null,
      deptHeadEmpId: 0,
      createdDate: null
    },
    {
      deptId: 177,
      deptName: "Software",
      deptHeadName: null,
      deptHeadEmpId: 0,
      createdDate: null
    }
  ];

  constructor(private http: HttpClient) { 

  }

  getAllRoles():Observable<APIResponse>{
    return this.http.get<APIResponse>(environment.API_URL + 'GetAllRoles');
  }

  getAllDesignation(): Observable<APIResponse>{
    return this.http.get<APIResponse>(environment.API_URL + 'GetAllDesignation');
  }


  getAllEmployee():Observable<APIResponse>{
    return this.http.get<APIResponse>(environment.API_URL + 'GetAllEmployee');
  }



  createNewEmployee(employeeData: any): Observable<APIResponse>{
    return this.http.post<APIResponse>(environment.API_URL + 'CreateNewEmployee', employeeData );
  }


  getEmployeeById(id: number): Observable<APIResponse>{
    return this.http.get<APIResponse>(environment.API_URL + 'GetEmployeeByEmployeeId?id=?' + id );
  }


  getAllDept():Observable<APIResponse>{
    return this.http.get<APIResponse>('https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetDepartments');
  }

  getChildDeptById(id: number): Observable<APIResponse>{
    return this.http.get<APIResponse>( environment.API_URL + Constant.API_METHOD.GET_CHILD_DEPT_BY_ID + id );
  }


  updateEmp(obj: Employee): Observable<APIResponse> {
    debugger;
    return this.http.put<APIResponse>(environment.API_URL+ "UpdateEmployee/" + obj.empId, obj);
  }

  deleteEmpById(id: number): Observable<APIResponse> {
    debugger;
    return this.http.delete<APIResponse>(environment.API_URL + "DeleteEmployee/" +id);
  }
}
