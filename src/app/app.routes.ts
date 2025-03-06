import { Routes } from '@angular/router';
import { MasterComponent } from './components/master/master.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ClientComponent } from './components/client/client.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './services/auth.guard';
import { CustomerComponent } from './components/customer/customer.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [

{
    path: '',
    redirectTo: 'login',
    pathMatch: "full"
},

{
    path: 'login',
    component:LoginComponent
},

{
    path: 'register',
    component:RegisterComponent
},


{
    path: '',
    component:LayoutComponent,
    canActivate: [authGuard],
    children: [
        {
            path: 'master',
            component:MasterComponent
        },
        
        {
            path: 'employee',
            component:EmployeeComponent
        },
        
        {
            path: 'client',
            component:ClientComponent
        },
        {
            path: 'customer',
            component:CustomerComponent
        },
        
    
    ]
},


];
