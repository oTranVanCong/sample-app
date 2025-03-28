import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { AddProductComponent } from './features/products/add-product/add-product.component';
import { UpdateProductComponent } from './features/products/update-product/update-product.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'add-product', component: AddProductComponent },
    { path: 'update-product', component: UpdateProductComponent },
    { path: '**', component: NotFoundComponent },  // Wildcard route for a 404 page
];