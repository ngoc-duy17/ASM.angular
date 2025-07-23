import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css'
})
export class ProductEdit {
  product: Product = {
    id: 1,
    name: '',
    imageUrl: '',
    price: 0,
    category: '',
    inStock: true
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<Product>(`http://localhost:3000/products/${id}`).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (err) => {
          console.error('Lỗi khi tải sản phẩm:', err);
          alert('Không thể tải thông tin sản phẩm.');
        }
      });
    }
  }

  onSubmit() {
    this.http.put<Product>(`http://localhost:3000/products/${this.product.id}`, this.product).subscribe({
      next: () => {
        alert('Sản phẩm đã được cập nhật!');
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.error('Lỗi khi cập nhật sản phẩm:', err);
        alert('Không thể cập nhật sản phẩm.');
      }
    });
  }

  resetForm() {
    this.ngOnInit(); // Load lại dữ liệu gốc từ server
  }

}
