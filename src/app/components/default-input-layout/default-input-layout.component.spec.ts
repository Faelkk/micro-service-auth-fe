import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultInputLayoutComponent } from './default-input-layout.component';

describe('DefaultInputLayoutComponent', () => {
  let component: DefaultInputLayoutComponent;
  let fixture: ComponentFixture<DefaultInputLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultInputLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultInputLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
