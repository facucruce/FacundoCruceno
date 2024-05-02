import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display text correctly', () => {
    const text = 'Test Text';
    component.text = text;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('p')?.textContent).toContain(text);
  });
});
