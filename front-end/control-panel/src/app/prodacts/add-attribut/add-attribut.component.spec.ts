import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributComponent } from './add-attribut.component';

describe('AddAttributComponent', () => {
  let component: AddAttributComponent;
  let fixture: ComponentFixture<AddAttributComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttributComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttributComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
