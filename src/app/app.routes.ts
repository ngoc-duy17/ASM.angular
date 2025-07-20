import { Routes } from '@angular/router';
import { ProductList } from './pages/admin/product-list/product-list';
import { ProductAdd } from './pages/admin/product-add/product-add';
import { CategoryList } from './pages/admin/category-list/category-list';



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
    path: 'products/edit/:id',
    component: ProductAdd,
  },

  {
    path: 'categories',
    component: CategoryList,
  },


];
