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
  SupplierProducts: any = []
  submitted = false;
  supplierForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }
  ngOnInit() {}
  mainForm() {
    this.supplierForm = this.fb.group({
      supplierName: ['', [Validators.required]],
      supplierRepName: ['',[Validators.required]],
      supplierAddress: ['',[Validators.required]],
      supplierPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      productId: ['', [Validators.required]],
    });
  }
  // Choose designation with select dropdown
  updateProduct(e) {
    this.supplierForm.get('supplierProduct').setValue(e, {
      onlySelf: true,
    });
  }
  getProducts() {
    return this.apiService.getProducts().subscribe((data) => {
      this.SupplierProducts.push(data);
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
            this.ngZone.run(() => this.router.navigateByUrl('/supplier-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
