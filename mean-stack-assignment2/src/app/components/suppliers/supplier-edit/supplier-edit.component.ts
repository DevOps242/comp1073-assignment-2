import { Supplier } from '../../../../../backend/models/supplier';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css'],
})

export class SupplierEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  supplierData: Supplier[];
  SupplierProducts: any = []
  SupplierReps: any = []
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getProducts();
    this.getEmployees();
    this.updateSupplier();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getSupplier(id);
    this.editForm = this.fb.group({
      supplierName: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      supplierAddress: ['', [Validators.required]], 
      productId: ['', [Validators.required]],
      supplierPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  // Choose options with select-dropdown
  updateProduct(e) {
    this.editForm.get('productId').setValue(e, {
      onlySelf: true,
    });
  }

  updateEmployee(e) {
    this.editForm.get('employeeId').setValue(e, {
      onlySelf: true,
    });
  }

  getProducts() {
    return this.apiService.getProducts().subscribe((data) => {
      this.SupplierProducts.push(data);
    })
  }

  getEmployees() {
    return this.apiService.getEmployees().subscribe((data) => {
      this.SupplierReps.push(data);
    });
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getSupplier(id) {
    this.apiService.getSupplier(id).subscribe((data) => {
      this.editForm.setValue({
        supplierName: data['supplierName'],
        employeeId: data['employee'],
        supplierAddress: data['supplierAddress'],
        productId: data['product'],
        supplierPhoneNumber: data['supplierPhoneNumber'],
      });
    });
  }
  
  updateSupplier() {
    this.editForm = this.fb.group({
      supplierName: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      supplierAddress: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      supplierPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateSupplier(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/suppliers-list');
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