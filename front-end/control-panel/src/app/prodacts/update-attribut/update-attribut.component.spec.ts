import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAttributComponent } from './update-attribut.component';

describe('UpdateAttributComponent', () => {
  let component: UpdateAttributComponent;
  let fixture: ComponentFixture<UpdateAttributComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAttributComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAttributComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
