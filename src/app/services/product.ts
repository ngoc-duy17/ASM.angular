import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }
  // Lấy danh sách sản phẩm
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api).pipe(catchError(this.handleError));
  }
  // Lấy sản phẩm theo id
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`).pipe(
      map(product => ({ ...product, id: +product.id })) // ép id về number
    );
  }
  // Thêm sản phẩm
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.api, product).pipe(catchError(this.handleError));
  }
  // Cập nhật sản phẩm
  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${product.id}`, product).pipe(catchError(this.handleError));
  }
  // Xóa sản phẩm
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`).pipe(catchError(this.handleError));
  }
  // Xử lý lỗi HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "An unknown error occurred!";
    if (error.error instanceof ErrorEvent) {
      // Lỗi phía client
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Lỗi phía server
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
