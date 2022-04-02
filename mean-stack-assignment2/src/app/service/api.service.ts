import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})

export class ApiService {
  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  // ******************************** Customer end points****************************
  // Create
  createCustomer(data): Observable<any> {
    let url = `${this.baseUri}/customers/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }
  // Get all customers
  getCustomers() {
    return this.http.get(`${this.baseUri}/customers/read`);
  }
  // Get customer
  getCustomer(id): Observable<any> {
    let url = `${this.baseUri}/customers/read/:${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  // Update customer
  updateCustomer(id, data): Observable<any> {
    let url = `${this.baseUri}/customers/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  // Delete customer
  deleteCustomer(id): Observable<any> {
    let url = `${this.baseUri}/customers/delete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
// ******************************** Employee end points****************************
createEmployee(data): Observable<any> {
  let url = `${this.baseUri}/employees/create`;
  return this.http.post(url, data).pipe(catchError(this.errorMgmt));
}
// Get all customers
getEmployees() {
  return this.http.get(`${this.baseUri}/employees/read`);
}
// Get customer
getEmployee(id): Observable<any> {
  let url = `${this.baseUri}/employees/read/:${id}`;
  return this.http.get(url, { headers: this.headers }).pipe(
    map((res: Response) => {
      return res || {};
    }),
    catchError(this.errorMgmt)
  );
}
// Update customer
updateEmployee(id, data): Observable<any> {
  let url = `${this.baseUri}/employees/update/${id}`;
  return this.http
    .put(url, data, { headers: this.headers })
    .pipe(catchError(this.errorMgmt));
}
// Delete customer
deleteEmployee(id): Observable<any> {
  let url = `${this.baseUri}/employees/delete/${id}`;
  return this.http
    .delete(url, { headers: this.headers })
    .pipe(catchError(this.errorMgmt));
}

// ******************************** Product end points****************************
createProduct(data): Observable<any> {
  let url = `${this.baseUri}/products/create`;
  return this.http.post(url, data).pipe(catchError(this.errorMgmt));
}
// Get all products
getProducts() {
  return this.http.get(`${this.baseUri}/products/read`);
}
// Get product
getProduct(id): Observable<any> {
  let url = `${this.baseUri}/products/read/:${id}`;
  return this.http.get(url, { headers: this.headers }).pipe(
    map((res: Response) => {
      return res || {};
    }),
    catchError(this.errorMgmt)
  );
}
// Update product
updateProduct(id, data): Observable<any> {
  let url = `${this.baseUri}/products/update/${id}`;
  return this.http
    .put(url, data, { headers: this.headers })
    .pipe(catchError(this.errorMgmt));
}
// Delete product
deleteProduct(id): Observable<any> {
  let url = `${this.baseUri}/products/delete/${id}`;
  return this.http
    .delete(url, { headers: this.headers })
    .pipe(catchError(this.errorMgmt));
}

// ******************************** Suppliers end points****************************
createSupplier(data): Observable<any> {
  let url = `${this.baseUri}/suppliers/create`;
  return this.http.post(url, data).pipe(catchError(this.errorMgmt));
}
// Get all suppliers
getSuppliers() {
  return this.http.get(`${this.baseUri}/suppliers/read`);
}
// Get supplier
getSupplier(id): Observable<any> {
  let url = `${this.baseUri}/suppliers/read/:${id}`;
  return this.http.get(url, { headers: this.headers }).pipe(
    map((res: Response) => {
      return res || {};
    }),
    catchError(this.errorMgmt)
  );
}
// Update supplier supplier
updateSupplier(id, data): Observable<any> {
  let url = `${this.baseUri}/suppliers/update/${id}`;
  return this.http
    .put(url, data, { headers: this.headers })
    .pipe(catchError(this.errorMgmt));
}
// Delete supplier
deleteSupplier(id): Observable<any> {
  let url = `${this.baseUri}/suppliers/delete/${id}`;
  return this.http
    .delete(url, { headers: this.headers })
    .pipe(catchError(this.errorMgmt));
}

// ******************************** Inventory end points****************************
createInventory(data): Observable<any> {
  let url = `${this.baseUri}/inventory/create`;
  return this.http.post(url, data).pipe(catchError(this.errorMgmt));
}
// Get all inventory
getInventorys() {
  return this.http.get(`${this.baseUri}/inventory/read`);
}
// Get inventory
getInventory(id): Observable<any> {
  let url = `${this.baseUri}/inventory/read/:${id}`;
  return this.http.get(url, { headers: this.headers }).pipe(
    map((res: Response) => {
      return res || {};
    }),
    catchError(this.errorMgmt)
  );
}
// Update inventory
updateInventory(id, data): Observable<any> {
  let url = `${this.baseUri}/inventory/update/${id}`;
  return this.http
    .put(url, data, { headers: this.headers })
    .pipe(catchError(this.errorMgmt));
}
// Delete inventory 
deleteInventory(id): Observable<any> {
  let url = `${this.baseUri}/inventory/delete/${id}`;
  return this.http
    .delete(url, { headers: this.headers })
    .pipe(catchError(this.errorMgmt));
}

// ******************************** Error handling****************************
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}