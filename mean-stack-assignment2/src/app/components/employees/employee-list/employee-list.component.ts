import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../service/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  Employee:any = [];
  constructor(private apiService: ApiService) { 
    this.readCustomer();
    
  }
  ngOnInit() {}
  readCustomer(){
    this.apiService.getEmployees().subscribe((data) => {
     this.Employee = data;
    })    
  }
  removeCustomer(employee, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteCustomer(employee._id).subscribe((data) => {
          this.Employee.splice(index, 1);
        }
      )    
    }
  }
}