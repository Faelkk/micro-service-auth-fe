import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableTwoFaComponent } from './enable-two-fa.component';

describe('EnableTwoFaComponent', () => {
  let component: EnableTwoFaComponent;
  let fixture: ComponentFixture<EnableTwoFaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnableTwoFaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnableTwoFaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
