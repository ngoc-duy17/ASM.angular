import { Routes } from '@angular/router';
import { ClientLayout } from './layouts/client-layout/client-layout';
import { Home } from './pages/Client/home/home';
import { List } from './pages/Client/list/list';
import { Detail } from './pages/admin/detail/product-detail';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { ProductList } from './pages/admin/product-list/product-list';
import { ProductAdd } from './pages/admin/product-add/product-add';
import { ProductDetail } from './pages/Client/product-detail/product-detail';
import { ProductEdit } from './pages/admin/product-edit/product-edit';
import { CategoryList } from './pages/admin/category-list/category-list';
import { Auth } from './layouts/auth/auth';
import { Login } from './pages/Client/login/login';
import { Register } from './pages/Client/register/register';

export const routes: Routes = [
  {
    path: '',
    component: ClientLayout,
    children: [
      { path: '', component: Home },
      { path: 'products', component: List },
      { path: 'product/:id', component: ProductDetail },

    ]
  },
  {
    path: '',
    component: Auth,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register }
    ]
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: 'products', component: ProductList },
      { path: 'products/add', component: ProductAdd },
      { path: 'products/:id/edit', component: ProductEdit },
      { path: 'categories', component: CategoryList },
      { path: 'products/:id/detail', component: Detail },
    ]
  }
]