import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        ProductFormComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.productForm.value).toEqual({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: ''
    });
  });

  it('should set minDateISOString correctly', () => {
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    expect(component.minDateISOString).toEqual(minDate);
  });

  it('should set date_revision correctly on setDateRelease()', () => {
    const dateRelease = '2024-05-01';
    component.productForm.get('date_release')?.setValue(dateRelease);
    component.setDateRelease();
    const dateRevision = new Date(dateRelease);
    dateRevision.setFullYear(dateRevision.getFullYear() + 1);
    const expectedDateRevision = dateRevision.toISOString().split('T')[0];
    expect(component.productForm.get('date_revision')?.value).toEqual(expectedDateRevision);
  });


});
