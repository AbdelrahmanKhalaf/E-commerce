import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccssesComponent } from './succsses.component';

describe('SuccssesComponent', () => {
  let component: SuccssesComponent;
  let fixture: ComponentFixture<SuccssesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccssesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccssesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
