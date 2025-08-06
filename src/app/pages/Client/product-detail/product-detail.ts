import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product, ProductService } from '../../../services/product';
import { CategoryService, Category } from '../../../services/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  categoryName: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getById(id).subscribe({
        next: (data: Product) => {
          this.product = data;

          // Sau khi lấy product, lấy tên category từ ID
          if (data.category) {
            this.categoryService.getById(data.category).subscribe({
              next: (category: Category) => {
                this.categoryName = category.name;
              },
              error: () => {
                this.categoryName = 'Không rõ';
              }
            });
          }
        },
        error: (err) => console.error('Lỗi khi tải chi tiết sản phẩm:', err)
      });
    }
  }

  addToCart(product: Product) {
    console.log('Đã thêm vào giỏ hàng:', product);
  }
}
