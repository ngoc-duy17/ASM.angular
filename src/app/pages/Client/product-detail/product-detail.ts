import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getById(id).subscribe({
      next: (data: Product) => this.product = data,
      error: (err) => console.error('Lỗi khi tải chi tiết sản phẩm:', err)
    });
  }
  addToCart(product: Product) {
    console.log('Đã thêm vào giỏ hàng:', product);
    // Gọi service giỏ hàng ở đây nếu có
  }
}
