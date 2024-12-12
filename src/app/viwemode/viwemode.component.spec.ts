import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViwemodeComponent } from './viwemode.component';

describe('ViwemodeComponent', () => {
  let component: ViwemodeComponent;
  let fixture: ComponentFixture<ViwemodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViwemodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViwemodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
