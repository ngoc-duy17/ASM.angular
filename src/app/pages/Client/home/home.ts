import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../../services/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data: Product[]) => {
        this.products = data; // Lấy 4 sản phẩm mới
      },
      error: (err) => {
        console.error('Lỗi khi tải sản phẩm:', err);
      }
    });
  }
}
