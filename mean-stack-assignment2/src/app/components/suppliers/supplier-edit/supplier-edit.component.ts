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
  SupplierProducts: any = []
  submitted = false;
  editForm: FormGroup;
  supplierData: Supplier[];
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.updateSupplier();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getSupplier(id);
    this.editForm = this.fb.group({
      supplierName: ['', [Validators.required]],
      supplierRepName: ['', [Validators.required]],
      supplierAddress: ['', [Validators.required]], 
      supplierProduct: ['', [Validators.required]],
      supplierPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  // Choose options with select-dropdown
  updateProduct(e) {
    this.editForm.get('supplierProduct').setValue(e, {
      onlySelf: true,
    });
  }

  getProducts() {
    return this.apiService.getProducts().subscribe((data) => {
      this.SupplierProducts.push(data);
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }
  getSupplier(id) {
    this.apiService.getSupplier(id).subscribe((data) => {
      this.editForm.setValue({
        supplierName: data['supplierName'],
        supplierRepName: data['supplierRepName'],
        supplierAddress: data['supplierAddress'],
        supplierPhoneNumber: data['supplierPhoneNumber'],
        supplierProduct: data['supplierProduct'],
      });
    });
  }
  updateSupplier() {
    this.editForm = this.fb.group({
      supplierName: ['', [Validators.required]],
      supplierRepName: ['', [Validators.required]],
      supplierAddress: ['', [Validators.required]],
      supplierCountry: ['', [Validators.required]],
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
            this.router.navigateByUrl('/supplier-list');
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