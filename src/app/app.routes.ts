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
// import { ProductList } from './pages/admin/product-list/product-list';
// import { ProductAdd } from './pages/admin/product-add/product-add';
// import { CategoryList } from './pages/admin/category-list/category-list';
// import { ProductEdit } from './pages/admin/product-edit/product-edit';


// import { Detail } from './pages/admin/detail/product-detail';
// import { Home } from './pages/Client/home/home';
// import { List } from './pages/Client/list/list';

export const routes: Routes = [
  // // admin
  // { path: 'admin', component: ProductList },
  // { path: 'admin/products', component: ProductList },
  // { path: 'admin/products/add', component: ProductAdd },
  // { path: 'admin/products/:id/edit', component: ProductEdit },
  // { path: 'admin/categories', component: CategoryList },
  // { path: 'admin/products/:id/detail', component: Detail },
  // // client
  // { path: '', component: Home }, // trang chủ hiển thị danh sách sản phẩm
  // { path: 'products', component: List },
  // { path: 'product/:id', component: Detail },
  {
    path: '',
    component: ClientLayout,
    children: [
      { path: '', component: Home },
      { path: 'products', component: List },
      { path: 'product/:id', component: ProductDetail }
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