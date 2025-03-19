import { Component, inject, Inject } from '@angular/core';
import { LoginDto } from '../../model/class/LoginDto';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { LoginResponse } from '../../model/interface/roles';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: LoginDto = new LoginDto();
  router = inject(Router);
  masterSrv = inject(MasterService);


  onLogin() {
    this.masterSrv.login(this.loginObj).subscribe((res: LoginResponse)=>{
if(res.code == 0) {
console.log("Login Successfully");
this.router.navigateByUrl('/employee');
localStorage.setItem('loggedInUser', this.loginObj.email);
} else{
  alert("Wrong Credentials");
}
    })
  }


//   onLogin(){
//       loginResponse: LoginRe = this.masterSrv.login(this.loginObj);
//     if(this.loginObj.email == "admin@admin" && this.loginObj.password == "admin"){
//       // alert("Login Successful");
//       this.router.navigateByUrl('/employee');
//       localStorage.setItem('loggedInUser', this.loginObj.email);
//   }else{
//     alert("Wrong Credentials");
//     // this.router.navigateByUrl('');
//   }
// }


}