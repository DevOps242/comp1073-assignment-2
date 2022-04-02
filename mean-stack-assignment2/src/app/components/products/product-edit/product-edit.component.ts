import { Product } from '../../../../../backend/models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  customerData: Product[];
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.updateProduct();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getProduct(id);
    this.editForm = this.fb.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      productUnitPrice: ['', [Validators.required, Validators.pattern('^[0-9\.\$]+$')]],
      productQuantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      productCategory: ['', [Validators.required]],
    });
  }
  // Choose options with select-dropdown
  updateCategory(e) {
    this.editForm.get('productCategory').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }
  getProduct(id) {
    this.apiService.getProduct(id).subscribe((data) => {
      this.editForm.setValue({
        productName: data['productName'],
        productDescription: data['productDescription'],
        productUnitPrice: data['productUnitPrice'],
        productQuantity: data['productQuantity'],
        productCategory: data['productCategory'],
      });
    });
  }
  
  updateProduct() {
    this.editForm = this.fb.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      employeeAddress: ['', [Validators.required]],
      productUnitPrice: ['', [Validators.required, Validators.pattern('^[0-9\.\$]+$')]],
      productQuantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      productCategory: ['', [Validators.required]]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateProduct(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/products-list');
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
