import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './service/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerCreateComponent } from './components/customers/customer-create/customer-create.component';
import { CustomerListComponent } from './components/customers/customer-list/customer-list.component';
import { CustomerEditComponent } from './components/customers/customer-edit/customer-edit.component';
import { EmployeeCreateComponent } from './components/employees/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { SupplierCreateComponent } from './components/suppliers/supplier-create/supplier-create.component';
import { SupplierEditComponent } from './components/suppliers/supplier-edit/supplier-edit.component';
import { SupplierListComponent } from './components/suppliers/supplier-list/supplier-list.component';
import { InventoryCreateComponent } from './components/inventory/inventory-create/inventory-create.component';
import { InventoryEditComponent } from './components/inventory/inventory-edit/inventory-edit.component';
import { InventoryListComponent } from './components/inventory/inventory-list/inventory-list.component';
import { IndexComponent } from './components/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerCreateComponent,
    CustomerListComponent,
    CustomerEditComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductListComponent,
    SupplierCreateComponent,
    SupplierEditComponent,
    SupplierListComponent,
    InventoryCreateComponent,
    InventoryEditComponent,
    InventoryListComponent,
    IndexComponent

  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
