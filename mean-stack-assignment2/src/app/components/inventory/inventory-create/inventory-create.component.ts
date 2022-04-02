import { Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css']
})
export class InventoryCreateComponent implements OnInit {
  submitted = false;
  inventoryForm: FormGroup;
  InventoryProducts: any = []
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }
  ngOnInit() {
    this.getProducts();
    
  }
  mainForm() {
    this.inventoryForm = this.fb.group({
      productId: ['', [Validators.required]],
      availableQty: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      orderQty: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      units: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      unitPrice: ['', [Validators.required, Validators.pattern('^[0-9\.\$]+$')]],
      totalValue: ['', [Validators.required, Validators.pattern('^[0-9\.\$]+$')]],
    });
  }

  // Choose designation with select dropdown
  updateProduct(e) {
    this.inventoryForm.get('productId').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.inventoryForm.controls;
  }

  getProducts() {
    return this.apiService.getProducts().subscribe((data) => {
      this.InventoryProducts.push(data);
    });
  }

  updateTotal(e) {
    let units = this.inventoryForm.get('units').value;
    let unitPrice = this.inventoryForm.get('unitPrice').value;
    let totalPrice = units * unitPrice;
    let calculatedPrice = String(totalPrice.toFixed(2));
    this.inventoryForm.patchValue({"totalValue": calculatedPrice});
  }
 
  onSubmit() {
    this.submitted = true;
    if (!this.inventoryForm.valid) {
      return false;
    } else {
      return this.apiService.createInventory(this.inventoryForm.value).subscribe({
        complete: () => {
          console.log('Inventory successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/inventory-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
