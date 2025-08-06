import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit {
  categories: any[] = [];
  newCategoryName = '';
  editingCategory: any = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.http.get<any[]>('http://localhost:3000/categories')
      .subscribe({
        next: data => this.categories = data,
        error: err => console.error('Lỗi khi lấy danh mục:', err)
      });
  }

  addCategory(): void {
    const name = this.newCategoryName.trim();
    if (!name) return alert('Vui lòng nhập tên danh mục.');

    const newCategory = { name };
    this.http.post('http://localhost:3000/categories', newCategory).subscribe({
      next: () => {
        this.newCategoryName = '';
        this.loadCategories();
      },
      error: err => console.error('Lỗi khi thêm danh mục:', err)
    });
  }

  startEdit(category: any): void {
    this.editingCategory = { ...category };
  }

  saveEdit(): void {
    if (!this.editingCategory?.name.trim()) return alert('Tên danh mục không được để trống.');

    this.http.put(`http://localhost:3000/categories/${this.editingCategory.id}`, this.editingCategory).subscribe({
      next: () => {
        this.editingCategory = null;
        this.loadCategories();
      },
      error: err => console.error('Lỗi khi cập nhật danh mục:', err)
    });
  }

  cancelEdit(): void {
    this.editingCategory = null;
  }

  deleteCategory(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      this.http.delete(`http://localhost:3000/categories/${id}`).subscribe({
        next: () => this.loadCategories(),
        error: err => console.error('Lỗi khi xóa danh mục:', err)
      });
    }
  }
}

