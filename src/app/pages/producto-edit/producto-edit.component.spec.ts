import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEditComponent } from './producto-edit.component';

describe('ProductoEditComponent', () => {
  let component: ProductoEditComponent;
  let fixture: ComponentFixture<ProductoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
