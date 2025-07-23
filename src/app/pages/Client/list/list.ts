import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {
  products: Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (err) => console.error('Lỗi khi tải danh sách sản phẩm:', err)
    });
  }

}
