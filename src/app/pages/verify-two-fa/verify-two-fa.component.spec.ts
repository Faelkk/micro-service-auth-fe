import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTwoFaComponent } from './verify-two-fa.component';

describe('VerifyTwoFaComponent', () => {
  let component: VerifyTwoFaComponent;
  let fixture: ComponentFixture<VerifyTwoFaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyTwoFaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyTwoFaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
