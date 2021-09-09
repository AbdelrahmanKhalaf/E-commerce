import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServisesComponent } from './servises.component';

describe('ServisesComponent', () => {
  let component: ServisesComponent;
  let fixture: ComponentFixture<ServisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
