import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubcategoriesComponent } from './update-subcategories.component';

describe('UpdateSubcategoriesComponent', () => {
  let component: UpdateSubcategoriesComponent;
  let fixture: ComponentFixture<UpdateSubcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSubcategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
