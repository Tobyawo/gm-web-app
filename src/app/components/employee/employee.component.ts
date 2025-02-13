import { ChangeDetectorRef, Component, inject, Inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponse } from '../../model/interface/roles';
import { Employee } from '../../model/class/Employee';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  masterSrv = inject(MasterService)
// employee: any;
// isFormVisiable: boolean = true;
isFormVisiable = signal<boolean>(false);
isApiCallInProgress = signal<boolean>(false);
isLoader = signal<boolean>(true);
employeeObj: Employee = new Employee();
employeeList : Employee[] =[];
childDeptList =  signal<any[]>([]);
parentDept$ : Observable<any[]> = new Observable<any[]>(); 
parentDeptId: number =  0;


ngOnInit(): void { 
  this.getEmployees();
} 

constructor( private chageDetection:ChangeDetectorRef){
  this.parentDept$ =  this.masterSrv.getAllDept().pipe(
    map((data:APIResponse)=>{
      console.log(data.data);
      return data.data
    })
  );
}



onParentDeptChange() {
  const childDpet =  this.masterSrv.getChildDeptById(this.parentDeptId).subscribe((Res: APIResponse)=>{
    this.childDeptList.set(Res.data) 
  })
  // this.subscriptionList.push(childDpet)
  
}




  getEmployees() {
    // debugger
    this.masterSrv.getAllEmployee().subscribe((res:APIResponse)=>{ 
      // debugger
       this.employeeList = res.data;
      //  this.chageDetection.detectChanges();
       this.isLoader.set(false)
     })
    
  }

  onDelete(id: number) {}

  onEdit(data: Employee) {
    this.employeeObj =  data;
    this.isFormVisiable.set(true)
  }

  onUpdate() {
    this.masterSrv.updateEmp(this.employeeObj).subscribe((res:APIResponse)=>{
      alert("Employee Update")
      this.getEmployees();
      this.employeeObj = new Employee();
    },error=>{
      alert('API Error')
    })
  }

  onSave() {
    this.masterSrv.createNewEmployee(this.employeeObj).subscribe((res:APIResponse)=>{
if(res.result) {
alert("Employee Created Successfully");
this.employeeObj = new Employee();
} else{
  alert("Employee Creation Failed " + res.message);
}
    })
  }


}
