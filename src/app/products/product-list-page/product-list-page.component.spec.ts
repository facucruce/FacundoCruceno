import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductListPageComponent } from './product-list-page.component';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('ProductListPageComponent', () => {
  let component: ProductListPageComponent;
  let fixture: ComponentFixture<ProductListPageComponent>;
  let productService: Partial<ProductsService>;

  beforeEach(async () => {
    productService = {
      getProducts: jest.fn().mockReturnValue(Promise.resolve([]))
    };
    await TestBed.configureTestingModule({
      imports: [ProductListPageComponent],
      providers: [{ provide: ProductsService, useValue: productService },
      { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: jest.fn() } } } }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on initialization', waitForAsync(() => {
    const products: Product[] = [
      { id: 'trj-1', name: 'Product 1', description: 'Description 1', logo: '', date_release: new Date(), date_revision: new Date() },
      { id: 'trj-2', name: 'Product 2', description: 'Description 2', logo: '', date_release: new Date(), date_revision: new Date() }
    ];
    productService.getProducts = jest.fn().mockReturnValue(Promise.resolve(products));
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.products).toEqual(products);
      expect(component.filteredProducts).toEqual(products);
      expect(component.showDropdown.length).toBe(products.length);
    });
  }));

  it('should filter products based on search input', () => {
    const products: Product[] = [
      { id: 'trj-1', name: 'Product 1', description: 'Description 1', logo: '', date_release: new Date(), date_revision: new Date() },
      { id: 'trj-2', name: 'Product 2', description: 'Description 2', logo: '', date_release: new Date(), date_revision: new Date() }
    ];
    component.products = products;
    component.filteredProducts = products;
    const event = { target: { value: 'Product 1' } };
    component.search(event);
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('Product 1');
  });

  it('should search products', () => {
    const mockProducts: Product[] = [
      { id: 'trj-1', name: 'Product 1', description: 'Description 1', date_release: new Date(), date_revision: new Date(), logo: 'logo1.png' },
      { id: 'trj-2', name: 'Product 2', description: 'Description 2', date_release: new Date(), date_revision: new Date(), logo: 'logo2.png' }
    ];
    component.products = mockProducts;

    component.search({ target: { value: 'Product 1' } });

    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('Product 1');
  });

  it('should open modal for delete', () => {
    const mockProduct: Product = { id: 'trj-1', name: 'Product 1', description: 'Description 1', date_release: new Date(), date_revision: new Date(), logo: 'logo1.png' };
    component.modalDelete(mockProduct);

    expect(component.show_delete).toBe('¿Estas seguro de eliminar el producto Product 1?');
    expect(component.productToDelete).toEqual(mockProduct);
  });

  it('should delete product', async () => {
    const mockProduct: Product = { id: 'trj-1', name: 'Product 1', description: 'Description 1', date_release: new Date(), date_revision: new Date(), logo: 'logo1.png' };
    productService.deleteProduct = jest.fn().mockReturnValue(Promise.resolve(mockProduct));

    component.deleteProduct(mockProduct);
    await fixture.whenStable();

    expect(productService.deleteProduct).toHaveBeenCalledWith(mockProduct);
    expect(component.show_delete).toBe('');
  });
});
