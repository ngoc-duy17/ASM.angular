import { Routes } from '@angular/router';
import { ProductList } from './pages/admin/product-list/product-list';
import { ProductAdd } from './pages/admin/product-add/product-add';
import { CategoryList } from './pages/admin/category-list/category-list';
import { ProductEdit } from './pages/admin/product-edit/product-edit';
import { Detail } from './pages/admin/detail/product-detail';
import { Home } from './pages/Client/home/home';
import { ProductDetail } from './pages/Client/product-detail/product-detail';
import { Login } from './pages/Client/login/login';
import { Register } from './pages/Client/register/register';



export const routes: Routes = [
  // admin
  { path: '', component: ProductList, },
  { path: 'products', component: ProductList, },
  { path: 'products/add', component: ProductAdd, },
  { path: 'products/:id/edit', component: ProductEdit, },
  { path: 'categories', component: CategoryList, },
  { path: 'products/:id/detail', component: Detail },
  // client
  { path: '', component: Home, },
  { path: 'product/:id', component: ProductDetail, },
  { path: 'products/add', component: ProductAdd, },
  { path: 'login', component: Login, },
  { path: 'register', component: Register, },
];
