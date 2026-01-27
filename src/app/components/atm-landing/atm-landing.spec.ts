import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmLanding } from './atm-landing';

describe('AtmLanding', () => {
  let component: AtmLanding;
  let fixture: ComponentFixture<AtmLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtmLanding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtmLanding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
