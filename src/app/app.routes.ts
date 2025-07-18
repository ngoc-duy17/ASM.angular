import { Routes } from '@angular/router';
import { ProductList } from './pages/product-list/product-list';

import { CategoryList } from './pages/category-list/category-list';
import { ProductAdd } from './pages/product-add/product-add';


export const routes: Routes = [
  {
    path: '',
    component: ProductList,
  },
  {
    path: 'products',
    component: ProductList,
  },
  {
    path: 'products/add',
    component: ProductAdd,
  },

  {
    path: 'categories',
    component: CategoryList,
  },


];
