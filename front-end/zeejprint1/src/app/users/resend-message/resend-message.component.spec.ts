import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendMessageComponent } from './resend-message.component';

describe('ResendMessageComponent', () => {
  let component: ResendMessageComponent;
  let fixture: ComponentFixture<ResendMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
