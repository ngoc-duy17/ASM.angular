import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductForm, ProductService } from '../../../services/product';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './product-add.html',
  styleUrl: './product-add.css'
})
export class ProductAdd implements OnInit {
  product: ProductForm = {
    name: '',
    imageUrl: '',
    price: 0,
    category: '',
    description: '',
    inStock: true
  };

  categories: any[] = [];

  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/categories').subscribe(data => {
      this.categories = data;
    });
  }

  submitForm(form: NgForm): void {
    if (form.valid) {
      this.productService.create(this.product).subscribe({
        next: () => {
          alert('Thêm sản phẩm thành công');
          this.router.navigate(['admin/products']);
        },
        error: () => {
          alert('Thêm sản phẩm thất bại');
        }
      });
    }
  }
}
