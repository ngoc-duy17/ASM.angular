import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../models/product';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: Product[] = [];
  filterText = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.http.get<Product[]>('http://localhost:3000/products').subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Lỗi khi tải sản phẩm:', error);
        alert('Không thể tải danh sách sản phẩm. Vui lòng thử lại!');
      },
    });
  }

  filterProducts(): Product[] {
    return this.products.filter((product) =>
      (product.name || '').toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  deleteProduct(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.http.delete(`http://localhost:3000/products/${id}`).subscribe({
        next: () => {
          this.products = this.products.filter((product) => product.id !== id);
          alert('Sản phẩm đã được xóa!');
        },
        error: (error) => {
          console.error('Lỗi khi xóa sản phẩm:', error);
          alert('Không thể xóa sản phẩm. Vui lòng thử lại!');
        },
      });
    }
  }

}
