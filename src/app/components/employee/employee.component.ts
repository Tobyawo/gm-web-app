import { ChangeDetectorRef, Component, inject, Inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponse } from '../../model/interface/roles';
import { User } from '../../model/class/User';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AlertComponent } from '../reusableComponent/alert/alert.component';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, AlertComponent],
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
employeeObj: User = new User();
employeeList : User[] =[];
childDeptList =  signal<any[]>([]);
parentDept$ : Observable<any[]> = new Observable<any[]>(); 
parentDeptId: number =  0;


ngOnInit(): void { 
  this.getAdmins();
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




  getAdmins() {
    // debugger
    this.masterSrv.getAllEmployee().subscribe((res:APIResponse)=>{ 
      // debugger
       this.employeeList = res.data;
        console.log(this.employeeList);
      //  this.chageDetection.detectChanges();
       this.isLoader.set(false)
     })
    
  }

  onDelete(id: number) {}

  onEdit(data: User) {
    this.employeeObj =  data;
    this.isFormVisiable.set(true)
  }

  onUpdate() {
    this.masterSrv.updateEmp(this.employeeObj).subscribe((res:APIResponse)=>{
      alert("Employee Update")
      this.getAdmins();
      this.employeeObj = new User();
    },error=>{
      alert('API Error')
    })
  }

  onSave() {
    this.masterSrv.createNewEmployee(this.employeeObj).subscribe((res:APIResponse)=>{
if(res.result) {
alert("Employee Created Successfully");
this.employeeObj = new User();
} else{
  alert("Employee Creation Failed " + res.message);
}
    })
  }


}
