import { Component } from '@angular/core';
import { ProductFormComponent } from '../../shared/forms/product-form/product-form.component';

@Component({
  selector: 'app-product-create-page',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './product-create-page.component.html',
  styleUrl: './product-create-page.component.scss'
})
export class ProductCreatePageComponent {

}
