import { ChangeDetectorRef, Component, inject, Inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponse, NewUserResponse, UserResponse } from '../../model/interface/roles';
import { User2 } from '../../model/class/User2';
// import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AlertComponent } from '../reusableComponent/alert/alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  masterSrv = inject(MasterService)
    router = inject(Router);
// employee: any;
// isFormVisiable: boolean = true;
isFormVisiable = signal<boolean>(true);
isApiCallInProgress = signal<boolean>(false);
isLoader = signal<boolean>(true);
user: User2 = new User2();
userList : User2[] =[];
childDeptList =  signal<any[]>([]);
parentDept$ : Observable<any[]> = new Observable<any[]>(); 
parentDeptId: number =  0;


ngOnInit(): void { 
  this.getCustomers();
} 

constructor( private chageDetection:ChangeDetectorRef){
  this.parentDept$ =  this.masterSrv.getAllDept().pipe(
    map((data:APIResponse)=>{
      console.log(data.data);
      return data.data
    })
  );
}


goToLogin() {
  this.router.navigateByUrl('/login');
}

onParentDeptChange() {
  const childDpet =  this.masterSrv.getChildDeptById(this.parentDeptId).subscribe((Res: APIResponse)=>{
    this.childDeptList.set(Res.data) 
  })
  // this.subscriptionList.push(childDpet)
  
}




  getCustomers() {
    // debugger
    this.masterSrv.getAllUser().subscribe((res:UserResponse)=>{ 
      // debugger
       this.userList = res.content;
        console.log(this.userList);
      //  this.chageDetection.detectChanges();
       this.isLoader.set(false)
     })
    
  }

  onDelete(id: number) {}

  onEdit(data: User2) {
    this.user =  data;
    this.isFormVisiable.set(true)
  }

  onUpdate() {
    this.masterSrv.updateUser(this.user).subscribe((res:UserResponse)=>{
      alert("User Update")
      this.getCustomers();
      this.user = new User2();
    },error=>{
      alert('API Error')
    })
  }

  onSave() {
    debugger
    this.masterSrv.createNewUser(this.user).subscribe((res:NewUserResponse)=>{
if(res.code == 0) {
  debugger
alert("User Created Successfully");
this.user = new User2();
this.router.navigateByUrl('/login');
} else{
  alert("User Creation Failed " + res.description);
}
    })
  }


}
