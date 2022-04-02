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

@NgModule({
  declarations: [
    AppComponent,
    CustomerCreateComponent,
    CustomerListComponent,
    CustomerEditComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeListComponent

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
