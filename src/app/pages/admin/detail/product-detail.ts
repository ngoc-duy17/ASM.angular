import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class Detail implements OnInit {
  productId!: number;
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam || isNaN(+idParam)) {
      alert('ID sản phẩm không hợp lệ!');
      this.router.navigate(['/products']); // hoặc trang khác
      return;
    }

    this.productId = +idParam;
    this.loadProductDetail();
  }

  loadProductDetail(): void {
    this.productService.getById(this.productId).subscribe((data) => {
      this.product = data;
    });
  }
}
