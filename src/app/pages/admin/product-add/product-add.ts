import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './product-add.html',
  styleUrl: './product-add.css'
})
export class ProductAdd {
  constructor(private http: HttpClient, private router: Router) { }

  product: Omit<Product, 'id'> = {
    name: '',
    imageUrl: '',
    price: 0,
    category: '',
    inStock: true
  };

  onSubmit() {

    this.http.post<Product>('http://localhost:3000/products', this.product).subscribe({
      next: (res) => {
        alert('Sản phẩm đã được thêm!');
        this.resetForm();
        this.router.navigate(['/admin/products']);

      },
      error: (err) => {
        console.error('Lỗi khi thêm sản phẩm:', err);
        alert('Không thể thêm sản phẩm. Vui lòng thử lại.');
      }
    });
  }



  resetForm() {
    this.product = {
      name: '',
      imageUrl: '',
      price: 0,
      category: '',
      inStock: true
    };
  }
}
