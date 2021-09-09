import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReastPasswordComponent } from './reast-password.component';

describe('ReastPasswordComponent', () => {
  let component: ReastPasswordComponent;
  let fixture: ComponentFixture<ReastPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReastPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReastPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
