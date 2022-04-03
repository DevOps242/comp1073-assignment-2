import { Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css'],
})
export class SupplierCreateComponent implements OnInit {
  submitted = false;
  supplierForm: FormGroup;
  SupplierProducts: any = []
  SupplierReps: any = []
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
    this.getEmployees();
  }
  mainForm() {
    this.supplierForm = this.fb.group({
      supplierName: ['', [Validators.required]],
      employeeId: ['',[Validators.required]],
      supplierAddress: ['',[Validators.required]],
      supplierPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      productId: ['', [Validators.required]],
    });
  }
  // Choose designation with select dropdown
  updateProduct(e) {
    this.supplierForm.get('productId').setValue(e, {
      onlySelf: true,
    });
  }

  updateEmployee(e) {
    this.supplierForm.get('employeeId').setValue(e, {
      onlySelf: true,
    });
  }

  getProducts() {
    return this.apiService.getProducts().subscribe((data) => {
      this.SupplierProducts.push(data);
    });
  }

  getEmployees() {
    return this.apiService.getEmployees().subscribe((data) => {
      this.SupplierReps.push(data);
      console.log(data);
    });
  }

  // Getter to access form control
  get myForm() {
    return this.supplierForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.supplierForm.valid) {
      return false;
    } else {
      return this.apiService.createSupplier(this.supplierForm.value).subscribe({
        complete: () => {
          console.log('Supplier successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/suppliers-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
