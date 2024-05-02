import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreatePageComponent } from './product-create-page.component';
import { ProductsService } from '../../core/services/products.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProductCreatePageComponent', () => {
  let component: ProductCreatePageComponent;
  let fixture: ComponentFixture<ProductCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCreatePageComponent, HttpClientModule],
      providers: [ProductsService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
