import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerCreateComponent } from './components/customers/customer-create/customer-create.component';
import { CustomerListComponent } from './components/customers/customer-list/customer-list.component';
import { CustomerEditComponent } from './components/customers/customer-edit/customer-edit.component';
import { EmployeeCreateComponent } from './components/employees/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  // Customers URL's Routes
  { path: 'create-customer', component: CustomerCreateComponent },
  { path: 'edit-customer/:id', component: CustomerEditComponent },
  { path: 'customers-list', component: CustomerListComponent },
  // Employees URL's Routes  
  { path: 'create-employee', component: EmployeeCreateComponent },
  { path: 'edit-employee/:id', component: EmployeeEditComponent },
  { path: 'employees-list', component: EmployeeListComponent }

  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }