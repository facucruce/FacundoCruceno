import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/models/product.model';
import { ModalComponent } from '../../modal/modal.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, RouterModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  @Input() edit: boolean = false;
  @Input() product: Product | undefined;
  productForm!: FormGroup;
  logoFile: string = '';
  show_success: string = '';
  show_error: boolean = false;
  minDateISOString: string = '';

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService) {
    const today = new Date();
    this.minDateISOString = today.toISOString().split('T')[0];
  }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(200)])],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: ['', Validators.required]
    });

    if (this.product) {

      const dateRelease = typeof this.product.date_release === 'string' ?
        new Date(this.product.date_release) : this.product.date_release;

      const dateRevision = typeof this.product.date_revision === 'string' ?
        new Date(this.product.date_revision) : this.product.date_revision;

      const formattedDateRelease = dateRelease.toISOString().substring(0, 10);
      const formattedDateRevision = dateRevision.toISOString().substring(0, 10);

      this.logoFile = this.product.logo;

      this.productForm.patchValue({
        id: this.product.id,
        name: this.product.name,
        description: this.product.description,
        date_release: formattedDateRelease,
        date_revision: formattedDateRevision
      });
    }
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      this.logoFile = files[0].name;
    }
  }

  setDateRelease() {
    const dateRelease = this.productForm.get('date_release')?.value;
    const dateRevision = new Date(dateRelease);
    dateRevision.setFullYear(dateRevision.getFullYear() + 1);
    this.productForm.get('date_revision')?.setValue(dateRevision.toISOString().split('T')[0]);
  }

  resetForm() {
    this.productForm.reset({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: ''
    });
    this.logoFile = ''
  }



  save() {
    const formData: Product = {
      id: this.productForm.value.id,
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      logo: this.productForm.value.logo,
      date_release: this.productForm.value.date_release,
      date_revision: this.productForm.value.date_revision
    };

    if (!this.edit) {
      this.createProduct(formData)
    } else {
      this.editProduct(formData)
    }
  }

  createProduct(formData: Product) {
    this.productsService.postProducts(formData).then(response => {
      this.show_success = 'Producto cargado correctamente';
    })
      .catch(error => {
        this.show_error = true;
        if (error.status === 206) {
          let invalidKeys = Object.keys(error.body);
          invalidKeys.forEach(key => {
            const control = this.productForm.get(key);
            if (control) {
              control.markAsTouched();
            }
          });

        }
        console.error('Error al guardar el producto:', error);
      });
  }

  editProduct(formData: Product) {
    this.productsService.putProduct(formData).then(response => {
      this.show_success = 'Producto editado correctamente';
    })
      .catch(error => {
        console.error('Error al guardar el producto:', error);
      });
  }
}

