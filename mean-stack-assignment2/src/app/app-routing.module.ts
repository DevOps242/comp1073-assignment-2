import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Index Import
import { IndexComponent } from './components/index/index.component';
// Customer Imports
import { CustomerCreateComponent } from './components/customers/customer-create/customer-create.component';
import { CustomerListComponent } from './components/customers/customer-list/customer-list.component';
import { CustomerEditComponent } from './components/customers/customer-edit/customer-edit.component';
// Employee Imports
import { EmployeeCreateComponent } from './components/employees/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';
// Product Imports
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
// Supplier Imports
import { SupplierCreateComponent } from './components/suppliers/supplier-create/supplier-create.component';
import { SupplierListComponent } from './components/suppliers/supplier-list/supplier-list.component';
import { SupplierEditComponent } from './components/suppliers/supplier-edit/supplier-edit.component';
// Inventory Imports 
import { InventoryCreateComponent } from './components/inventory/inventory-create/inventory-create.component';
import { InventoryListComponent } from './components/inventory/inventory-list/inventory-list.component';
import { InventoryEditComponent } from './components/inventory/inventory-edit/inventory-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: IndexComponent },
  // Customers URL's Routes
  { path: 'create-customer', component: CustomerCreateComponent },
  { path: 'edit-customer/:id', component: CustomerEditComponent },
  { path: 'customers-list', component: CustomerListComponent },
  // Employees URL's Routes  
  { path: 'create-employee', component: EmployeeCreateComponent },
  { path: 'edit-employee/:id', component: EmployeeEditComponent },
  { path: 'employees-list', component: EmployeeListComponent },
  // Products URL's Routes
  { path: 'create-product', component: ProductCreateComponent },
  { path: 'edit-product/:id', component: ProductEditComponent },
  { path: 'products-list', component: ProductListComponent },
  // Inventory URL's Routes  
  { path: 'create-inventory', component: InventoryCreateComponent },
  { path: 'edit-inventory/:id', component: InventoryEditComponent },
  { path: 'inventory-list', component: InventoryListComponent },
  // Suppliers URL's Routes  
  { path: 'create-supplier', component: SupplierCreateComponent },
  { path: 'edit-supplier/:id', component: SupplierEditComponent },
  { path: 'suppliers-list', component: SupplierListComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }