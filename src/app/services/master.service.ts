import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, LoginResponse, NewUserResponse, UserResponse } from '../model/interface/roles';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/class/User';
import { Constant } from '../constants/Constant';
import { LoginDto } from '../model/class/LoginDto';
import { User2 } from '../model/class/User2';

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

  getAllUser():Observable<UserResponse>{
    return this.http.get<UserResponse>("http://localhost:8087/gm-user/api/admin/page/1?sortDir=asc&sortField=id");
  }


  createNewUser(newUser: any): Observable<NewUserResponse>{
    return this.http.post<NewUserResponse>("http://localhost:8087/gm-user/api/sign-up", newUser);
  }

  createNewEmployee(employeeData: any): Observable<APIResponse>{
    return this.http.post<APIResponse>(environment.API_URL + 'CreateNewEmployee', employeeData );
  }

  login(loginData: LoginDto): Observable<LoginResponse>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Host': 'gm-api.local', // Set host header
    });
    return this.http.post<LoginResponse>("http://localhost:8080/gm-access/api/auth", loginData, { headers });
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


  
  updateUser(obj: User2): Observable<UserResponse> {
  
    return this.http.put<UserResponse>("http://localhost:8087/gm-user/api/user/update", obj);
  }

  updateEmp(obj: User): Observable<APIResponse> {
 
    return this.http.put<APIResponse>(environment.API_URL+ "UpdateEmployee/" + obj.empId, obj);
  }

  deleteEmpById(id: number): Observable<APIResponse> {
    debugger;
    return this.http.delete<APIResponse>(environment.API_URL + "DeleteEmployee/" +id);
  }
}
