import { Inventory } from '../../../../../backend/models/inventory';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.css']
})

export class InventoryEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  customerData: Inventory[];
  InventoryProducts: any = []
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProducts();
    this.updateInventory();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getInventory(id);
    this.editForm = this.fb.group({
      productId: ['', [Validators.required]],
      availableQty: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      orderQty: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      units: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      unitPrice: ['', [Validators.required, Validators.pattern('^[0-9\.\$]+$')]],
      totalValue: ['', [Validators.required, Validators.pattern('^[0-9\.\$]+$')]],
    });
  }
  // Choose options with select-dropdown
  updateProduct(e) {
    this.editForm.get('productId').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }
  getInventory(id) {
    this.apiService.getInventory(id).subscribe((data) => {
      this.editForm.setValue({
        productId: data['product'],
        availableQty: data['availableQty'],
        orderQty: data['orderQty'],
        units: data['units'],
        unitPrice: data['unitPrice'],
        totalValue: data['totalValue'],
      });
    });
  }
  
  updateInventory() {
    this.editForm = this.fb.group({
      productId: ['', [Validators.required]],
      availableQty: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      orderQty: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      units: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      unitPrice: ['', [Validators.required, Validators.pattern('^[0-9\.\$]+$')]],
      totalValue: ['', [Validators.required, Validators.pattern('^[0-9\.\$]+$')]]
    });
  }
  getProducts() {
    return this.apiService.getProducts().subscribe((data) => {
      this.InventoryProducts.push(data);
    })
  }

  updateTotal(e) {
    let units = this.editForm.get('units').value;
    let unitPrice = this.editForm.get('unitPrice').value;
    let totalPrice = units * unitPrice;
    let calculatedPrice = String(totalPrice.toFixed(2));
    this.editForm.patchValue({"totalValue": calculatedPrice});
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateInventory(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/inventory-list');
            console.log('Content updated successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
  }
}
