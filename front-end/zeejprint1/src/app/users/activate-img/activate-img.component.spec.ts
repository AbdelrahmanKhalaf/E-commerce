import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateImgComponent } from './activate-img.component';

describe('ActivateImgComponent', () => {
  let component: ActivateImgComponent;
  let fixture: ComponentFixture<ActivateImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
