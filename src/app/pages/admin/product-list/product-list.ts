import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Product, ProductService } from '../../../services/product';
import { Category, CategoryService } from '../../../services/category';


@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
  }

  getCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  getCategoryName(categoryId: number | string): string {
    const found = this.categories.find(c => c.id === categoryId);
    return found ? found.name : 'Không rõ';
  }

  delete(id: number | string): void {
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
      this.productService.delete(id).subscribe(() => {
        this.products = this.products.filter(p => p.id !== id);
      });
    }
  }

  filterText = '';

  filterProducts(): Product[] {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

}
