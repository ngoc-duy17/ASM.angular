import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products = [
    {
      id: 1,
      name: 'Nike Air Max',
      price: 2000000,
      inStock: true,
      image: 'https://dvauthentic.vn/wp-content/uploads/2020/12/06-03.jpg'
    },
    {
      id: 2,
      name: 'Adidas UltraBoost',
      price: 2500000,
      inStock: false,
      image: 'https://dvauthentic.vn/wp-content/uploads/2020/12/06-03.jpg'
    },
    {
      id: 3,
      name: 'Converse Classic',
      price: 900000,
      inStock: true,
      image: 'https://dvauthentic.vn/wp-content/uploads/2020/12/06-03.jpg'
    },
  ];

  filterText = '';

  filterProducts() {
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}
