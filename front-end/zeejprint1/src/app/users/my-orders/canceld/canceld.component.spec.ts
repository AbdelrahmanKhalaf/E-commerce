import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceldComponent } from './canceld.component';

describe('CanceldComponent', () => {
  let component: CanceldComponent;
  let fixture: ComponentFixture<CanceldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanceldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
