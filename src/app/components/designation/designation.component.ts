import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponse, IDesignationModel } from '../../model/interface/roles';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-designation',
  imports: [FormsModule],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent  implements OnInit{


  designationList: IDesignationModel[] = [];
  isLoaded: boolean = true;
  masterService = inject(MasterService); // New way
  
 
  ngOnInit(): void {
    this.masterService.getAllDesignation().subscribe((response: APIResponse)=>{
      this.designationList = response.data;
    this.isLoaded = false; 
    }, error =>{
          alert("API error message ")
          this.isLoaded = false; 
        });
  }
  


}
