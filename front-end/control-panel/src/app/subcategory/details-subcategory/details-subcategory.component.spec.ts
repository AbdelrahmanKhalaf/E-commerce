import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSubcategoryComponent } from './details-subcategory.component';

describe('DetailsSubcategoryComponent', () => {
  let component: DetailsSubcategoryComponent;
  let fixture: ComponentFixture<DetailsSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
