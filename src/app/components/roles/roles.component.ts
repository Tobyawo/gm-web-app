import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponse, IRoles } from '../../model/interface/roles';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../services/master.service';


// we have component decorators inside the component annotation
// they provide information about the class
@Component({
  selector: 'app-roles',
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
roleList: IRoles[] = [];

masterService = inject(MasterService); // New way

// constructor(private masterService: MasterService){ // old way
// }


ngOnInit(): void {
  this.masterService.getAllRoles().subscribe((response: APIResponse)=>{
    this.roleList = response.data;
      }, error =>{
        alert("API error message ")
      });;
}





}
