import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../../services/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category, CategoryService } from '../../../services/category';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-edit.html',
})
export class ProductEdit implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    imageUrl: '',
    category: '',
    inStock: true,
    description: '' // nếu bạn dùng field này
  };

  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getById(id).subscribe({
        next: (data) => (this.product = data),
        error: (err) => console.error('Lỗi lấy sản phẩm:', err)
      });
    }

    // ✅ Lấy danh sách danh mục
    this.categoryService.getAll().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Lỗi lấy danh mục:', err)
    });
  }

  onSubmit() {
    this.productService.update(this.product).subscribe(() => {
      this.router.navigate(['/admin/products']);
    });
  }
}
