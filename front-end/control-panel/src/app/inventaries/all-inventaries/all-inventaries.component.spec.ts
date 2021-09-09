import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInventariesComponent } from './all-inventaries.component';

describe('AllInventariesComponent', () => {
  let component: AllInventariesComponent;
  let fixture: ComponentFixture<AllInventariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInventariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInventariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
