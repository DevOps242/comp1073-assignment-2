import { Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
})
export class CustomerCreateComponent implements OnInit {
  submitted = false;
  customerForm: FormGroup;
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
    this.customerForm = this.fb.group({
      customerName: ['', [Validators.required]],
      customerRepName: ['',[Validators.required]],
      customerAddress: ['',[Validators.required]],
      customerPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      customerCountry: ['', [Validators.required]],
      
    });
  }
  // Choose designation with select dropdown
  updateCountry(e) {
    this.customerForm.get('customerCountry').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.customerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.customerForm.valid) {
      return false;
    } else {
      return this.apiService.createCustomer(this.customerForm.value).subscribe({
        complete: () => {
          console.log('Customer successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/customers-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
