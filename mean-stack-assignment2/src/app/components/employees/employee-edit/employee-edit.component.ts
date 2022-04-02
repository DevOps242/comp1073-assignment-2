import { Employee } from '../../../../../backend/models/employee';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})

export class EmployeeEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  customerData: Employee[];
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.updateEmployee();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
    this.editForm = this.fb.group({
      employeeFirstName: ['', [Validators.required]],
      employeeLastName: ['', [Validators.required]],
      employeeAddress: ['', [Validators.required]], 
      employeeDepartment: ['', [Validators.required]],
      employeePhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  // Choose options with select-dropdown
  updateDepartment(e) {
    this.editForm.get('employeeDepartment').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }
  getEmployee(id) {
    this.apiService.getEmployee(id).subscribe((data) => {
      this.editForm.setValue({
        employeeFirstName: data['employeeFirstName'],
        employeeLastName: data['employeeLastName'],
        employeeAddress: data['employeeAddress'],
        employeePhoneNumber: data['employeePhoneNumber'],
        employeeDepartment: data['employeeDepartment'],
      });
    });
  }
  updateEmployee() {
    this.editForm = this.fb.group({
      employeeFirstName: ['', [Validators.required]],
      employeeLastName: ['', [Validators.required]],
      employeeAddress: ['', [Validators.required]],
      employeeDepartment: ['', [Validators.required]],
      employeePhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateEmployee(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/employees-list');
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