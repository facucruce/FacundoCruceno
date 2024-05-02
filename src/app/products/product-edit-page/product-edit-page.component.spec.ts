import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditPageComponent } from './product-edit-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';

describe('ProductEditPageComponent', () => {
  let component: ProductEditPageComponent;
  let fixture: ComponentFixture<ProductEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEditPageComponent, HttpClientModule],
      providers: [ProductsService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: jest.fn() } } } }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
