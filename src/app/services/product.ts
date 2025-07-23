import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api).pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`).pipe(
      map(product => ({ ...product, id: +product.id })) // ép id về number
    );
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.api, product).pipe(catchError(this.handleError));
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${product.id}`, product).pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Có lỗi xảy ra. Vui lòng thử lại sau!'));
  }
}
