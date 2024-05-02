import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { ProductsService } from '../../core/services/products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, ModalComponent],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss'
})
export class ProductListPageComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  productsToShow: number = 5;
  showDropdown: boolean[] = [];
  iconEllipsisVertical = faEllipsisVertical;
  iconXmark = faXmark;
  show_delete: string = '';
  productToDelete: Product | null = null;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts()
      .then((response: Product[]) => {
        this.products = response;
        this.filteredProducts = this.products;
        this.showDropdown = new Array(this.products.length).fill(false);
      })
      .catch(error => {
        console.log('Error al obtener los productos:', error);
      });
  }

  search(event: any) {
    const text = event.target.value;
    if (!text.trim()) {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase()) ||
      product.description.toLowerCase().includes(text.toLowerCase())
    );
  }

  onChangeQuantity(event: any) {
    this.productsToShow = event.target.value;
  }

  toggleDropdown(index: number) {
    this.showDropdown = this.showDropdown.map((value, i) => i === index && !value);
  }

  modalDelete(product: Product) {
    this.show_delete = '¿Estas seguro de eliminar el producto ' + product.name + '?'
    this.productToDelete = product
  }

  deleteProduct(product: Product | null) {
    if (product) {
      this.productsService.deleteProduct(product).then((response) => {
        this.show_delete = '';
        this.getProducts();
      })
        .catch(error => {
          console.error('Error al eliminar el producto:', error);
        });
    }
  }
}
