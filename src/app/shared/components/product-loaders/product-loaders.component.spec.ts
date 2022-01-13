import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLoadersComponent } from './product-loaders.component';

describe('ProductLoadersComponent', () => {
  let component: ProductLoadersComponent;
  let fixture: ComponentFixture<ProductLoadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductLoadersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLoadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
