import { Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  submitted = false;
  productForm: FormGroup;
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
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      productDescription: ['',[Validators.required]],
      productUnitPrice: ['', [Validators.required, Validators.pattern('^[0-9\.\$]+$')]],
      productQuantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      productCategory: ['', [Validators.required]],
      
    });
  }
  // Choose designation with select dropdown
  updateCategory(e) {
    this.productForm.get('productCategory').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.productForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.productForm["productCategory"]);
    if (!this.productForm.valid) {
      return false;
    } else {
      return this.apiService.createProduct(this.productForm.value).subscribe({
        complete: () => {
          console.log('Product successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/products-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}