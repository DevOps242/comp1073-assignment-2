import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../service/api.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  Inventory:any = [];
  constructor(private apiService: ApiService) { 
    this.readInventory();
    
  }
  ngOnInit() {}
  readInventory(){
    this.apiService.getInventorys().subscribe((data) => {
     this.Inventory = data;
    })    
  }
  removeInventory(inventory, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteInventory(inventory._id).subscribe((data) => {
          this.Inventory.splice(index, 1);
        }
      )    
    }
  }
}