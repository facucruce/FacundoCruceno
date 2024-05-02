import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLayoutComponent } from './product-layout.component';

describe('ProductLayoutComponent', () => {
  let component: ProductLayoutComponent;
  let fixture: ComponentFixture<ProductLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductLayoutComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain a router outlet', () => {
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should have the correct header text', () => {
    const headerText = fixture.nativeElement.querySelector('.header h1').textContent;
    expect(headerText).toContain('BANCO');
  });

  it('should have an image in the header', () => {
    const headerImage = fixture.nativeElement.querySelector('.header img');
    expect(headerImage).toBeTruthy();
  });
});
