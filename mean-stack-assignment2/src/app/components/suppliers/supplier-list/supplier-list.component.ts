import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../service/api.service';
@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  
  Supplier:any = [];
  constructor(private apiService: ApiService) { 
    this.readSupplier();
    
  }
  ngOnInit() {}
  readSupplier(){
    this.apiService.getSuppliers().subscribe((data) => {
     this.Supplier = data;
    })    
  }
  removeSupplier(supplier, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteSupplier(supplier._id).subscribe((data) => {
          this.Supplier.splice(index, 1);
        }
      )    
    }
  }
}