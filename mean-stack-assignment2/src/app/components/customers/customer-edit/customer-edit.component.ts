import { Customer } from '../../../../../backend/models/customer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})

export class CustomerEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  customerData: Customer[];
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.updateCustomer();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getCustomer(id);
    this.editForm = this.fb.group({
      customerName: ['', [Validators.required]],
      customerRepName: ['', [Validators.required]],
      customerAddress: ['', [Validators.required]], 
      customerCountry: ['', [Validators.required]],
      customerPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  // Choose options with select-dropdown
  updateCounrty(e) {
    this.editForm.get('customerCountry').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }
  getCustomer(id) {
    this.apiService.getCustomer(id).subscribe((data) => {
      this.editForm.setValue({
        customerName: data['customerName'],
        customerRepName: data['customerRepName'],
        customerAddress: data['customerAddress'],
        customerPhoneNumber: data['customerPhoneNumber'],
        customerCountry: data['customerCountry'],
      });
    });
  }
  updateCustomer() {
    this.editForm = this.fb.group({
      customerName: ['', [Validators.required]],
      customerRepName: ['', [Validators.required]],
      customerAddress: ['', [Validators.required]],
      customerCountry: ['', [Validators.required]],
      customerPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateCustomer(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/customers-list');
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