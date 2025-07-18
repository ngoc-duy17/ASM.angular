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
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/537ecfc3-8b48-4e42-9f39-746a5a2de31f/air-max-90-shoes.png'
    },
    {
      id: 2,
      name: 'Adidas UltraBoost',
      price: 2500000,
      inStock: false,
      image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/17c5fe3454474036b4fcaf6d00a04bb1_9366/Ultraboost_1.0_Shoes_White_GX3408_01_standard.jpg'
    },
    {
      id: 3,
      name: 'Converse Classic',
      price: 900000,
      inStock: true,
      image: 'https://www.converse.com/on/demandware.static/-/Sites-converse-master-catalog/default/dw8f9e556d/images/a_107/1U647C_A_107X1.jpg'
    },
  ];

  filterText = '';

  filterProducts() {
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}
