import { Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent implements OnInit {
  submitted = false;
  employeeForm: FormGroup;
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
    this.employeeForm = this.fb.group({
      employeeFirstName: ['', [Validators.required]],
      employeeLastName: ['',[Validators.required]],
      employeeAddress: ['',[Validators.required]],
      employeePhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      employeeDepartment: ['', [Validators.required]],
      
    });
  }
  // Choose designation with select dropdown
  updateDepartment(e) {
    this.employeeForm.get('employeeDepartment').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.employeeForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.employeeForm["employeeDepartment"]);
    if (!this.employeeForm.valid) {
      return false;
    } else {
      return this.apiService.createEmployee(this.employeeForm.value).subscribe({
        complete: () => {
          console.log('Employee successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
