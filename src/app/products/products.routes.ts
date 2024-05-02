import { Routes } from '@angular/router';
import { ProductLayoutComponent } from './product-layout/product-layout.component';
import { ProductListPageComponent } from './product-list-page/product-list-page.component';
import { ProductCreatePageComponent } from './product-create-page/product-create-page.component';
import { ProductEditPageComponent } from './product-edit-page/product-edit-page.component';

export const PRODUCTS_ROUTES: Routes = [
    {
        'path': '', component: ProductLayoutComponent, children: [
            { 'path': '', component: ProductListPageComponent },
            { 'path': 'create', component: ProductCreatePageComponent },
            { 'path': 'edit/:id', component: ProductEditPageComponent }
        ]
    }
];
