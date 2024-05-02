import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFormComponent } from '../../shared/forms/product-form/product-form.component';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-edit-page',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './product-edit-page.component.html',
  styleUrl: './product-edit-page.component.scss'
})
export class ProductEditPageComponent implements OnInit {
  product?: Product;

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getProduct(id)
  }

  getProduct(id: string | null) {
    const product = this.productsService.getProductById(id as string);
    if (!product) {
      this.router.navigate(['/']);
    }
    this.product = product as Product
  }
}
